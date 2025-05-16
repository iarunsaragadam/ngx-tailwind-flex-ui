import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  imports: [CommonModule],
})
export class FileUploadComponent {
  @Input() multiple = true;
  @Input() acceptedFormats: string[] = [
    '.jpg',
    '.png',
    '.pdf',
    '.docx',
    '.mp4',
    '.mp3',
  ];
  @Input() maxSizeMB = 5;
  @Input() maxFiles = 5;
  @Input() autoUpload = false;

  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() filesUploaded = new EventEmitter<File[]>();

  selectedFiles: File[] = [];
  filePreviews: { [key: string]: string } = {};
  uploadProgress: { [key: string]: number } = {};
  uploadStatus: { [key: string]: boolean } = {};
  pausedUploads: { [key: string]: boolean } = {};

  isDragging = false;
  isUploading = false;
  errorMessage = '';
  showDeleteConfirmation = false;
  fileToDeleteIndex: number | null = null;

  showPreview = false;
  selectedPreview = '';
  selectedFileType = '';

  @ViewChild('closeButton') closeButton!: ElementRef;

  isPreviewable(fileType: string): boolean {
    return (
      fileType.startsWith('image/') ||
      fileType.startsWith('video/') ||
      fileType.startsWith('audio/') ||
      fileType === 'application/pdf' ||
      fileType === 'application/msword' ||
      fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
      input.value = '';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files) {
      this.processFiles(Array.from(event.dataTransfer.files));
    }
  }

  processFiles(files: File[]) {
    this.errorMessage = '';
    const existingFileNames = new Set(this.selectedFiles.map((f) => f.name));
    const validFiles: File[] = [];

    const maxFilesAllowed = this.multiple ? this.maxFiles : 1;
    if (this.selectedFiles.length >= maxFilesAllowed) {
      this.errorMessage = `❗ Maximum files limit of ${maxFilesAllowed} reached. Remove existing files to add new ones`;
      return;
    }

    for (const file of files) {
      const isUploaded = this.uploadStatus[file.name];

      if (isUploaded) {
        this.errorMessage = `❗ "${file.name}" has already been uploaded. Please select a different file`;
        continue;
      }

      if (existingFileNames.has(file.name)) {
        this.errorMessage = `❗ "${file.name}" is already in the list. Please choose a different file`;
        continue;
      }

      if (!this.validateFile(file)) continue;

      validFiles.push(file);
      existingFileNames.add(file.name);
    }

    if (this.selectedFiles.length + validFiles.length > maxFilesAllowed) {
      this.errorMessage = `❗ Cannot add more files. Maximum limit of ${maxFilesAllowed} files reached`;
      return;
    }

    if (validFiles.length === 0 && !this.errorMessage) {
      this.errorMessage =
        '❗ No valid files were selected. Please check the file requirements';
      return;
    }

    if (validFiles.length > 0) {
      this.selectedFiles = this.multiple
        ? [...this.selectedFiles, ...validFiles]
        : [validFiles[0]];

      this.filesSelected.emit(this.selectedFiles);
      console.log(
        'Updated selected files:',
        this.selectedFiles.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        }))
      );

      validFiles
        .filter((file) => file.type.startsWith('image/'))
        .forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.filePreviews[file.name] = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        });

      if (this.autoUpload) {
        this.uploadFiles();
      }
    }
  }

  validateFile(file: File): boolean {
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const isValidType = this.acceptedFormats.includes(ext);
    const isValidSize = file.size <= this.maxSizeMB * 1024 * 1024;

    if (!isValidType) {
      this.errorMessage = `❗ "${
        file.name
      }" has an unsupported format. Accepted formats: ${this.acceptedFormats.join(
        ', '
      )}`;
      return false;
    }

    if (!isValidSize) {
      this.errorMessage = `❗ "${file.name}" exceeds the size limit of ${this.maxSizeMB}MB`;
      return false;
    }

    if (file.size === 0) {
      this.errorMessage = `❗ "${file.name}" is empty. Please select a valid file`;
      return false;
    }

    return true;
  }

  initiateFileRemoval(index: number) {
    this.fileToDeleteIndex = index;
    this.showDeleteConfirmation = true;
  }

  confirmFileRemoval() {
    if (this.fileToDeleteIndex !== null) {
      const removed = this.selectedFiles[this.fileToDeleteIndex];
      delete this.filePreviews[removed.name];
      delete this.uploadProgress[removed.name];
      delete this.uploadStatus[removed.name];
      delete this.pausedUploads[removed.name];

      this.selectedFiles.splice(this.fileToDeleteIndex, 1);
      this.errorMessage =
        this.selectedFiles.length > 0
          ? ''
          : 'ℹ️ File list is now empty. Select new files to upload';

      this.filesSelected.emit(this.selectedFiles);
      console.log('File removed:', {
        name: removed.name,
        size: removed.size,
        type: removed.type, // Fixed typo: 'replaced' -> 'removed'
        lastModified: removed.lastModified,
      });
      console.log(
        'Updated selected files after removal:',
        this.selectedFiles.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        }))
      );
    }
    this.showDeleteConfirmation = false;
    this.fileToDeleteIndex = null;
  }

  cancelFileRemoval() {
    this.showDeleteConfirmation = false;
    this.fileToDeleteIndex = null;
  }

  uploadFiles() {
    if (this.selectedFiles.length === 0) {
      this.errorMessage = '❗ Please select the file';
      return;
    }

    const allUploaded = this.selectedFiles.every(
      (file) => this.uploadStatus[file.name]
    );
    if (allUploaded) {
      this.errorMessage =
        '❗ All selected files are already uploaded. Please select new files to upload';
      return;
    }

    const anyUploading = this.selectedFiles.some(
      (file) =>
        this.uploadProgress[file.name] !== undefined &&
        this.uploadProgress[file.name] < 100
    );
    if (anyUploading || this.isUploading) {
      this.errorMessage = '❗ Please wait for current uploads to complete';
      return;
    }

    this.errorMessage = '';
    this.isUploading = true;

    const filesToUpload = this.selectedFiles.filter(
      (file) => !this.uploadStatus[file.name]
    );

    filesToUpload.forEach((file) => {
      this.uploadProgress[file.name] = 0;
      this.uploadStatus[file.name] = false;

      const interval = setInterval(() => {
        if (this.pausedUploads[file.name]) return;

        if (this.uploadProgress[file.name] < 100) {
          this.uploadProgress[file.name] += 20;
        } else {
          clearInterval(interval);
          this.uploadStatus[file.name] = true;

          // Check if all files are uploaded
          const allDone = filesToUpload.every((f) => this.uploadStatus[f.name]);
          if (allDone) {
            this.isUploading = false;
            this.errorMessage = '✅ Upload completed successfully';
            this.filesUploaded.emit(filesToUpload);

            setTimeout(() => {
              filesToUpload.forEach((f) => delete this.uploadProgress[f.name]);
              this.errorMessage = '';
            }, 2000); // Reduced delay for test alignment
          }
        }
      }, 500); // 5 increments of 500ms = 2500ms to reach 100
    });
  }

  togglePause(fileName: string) {
    this.pausedUploads[fileName] = !this.pausedUploads[fileName];
  }

  openPreview(fileName: string) {
    const file = this.selectedFiles.find((f) => f.name === fileName);
    if (!file) return;

    this.selectedFileType = file.type;

    if (file.type.startsWith('image/')) {
      this.showPreview = true;
      this.selectedPreview = this.filePreviews[fileName];

      setTimeout(() => {
        if (this.closeButton?.nativeElement) {
          this.closeButton.nativeElement.focus();
        }
      }, 0);
    } else {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    }
  }

  closePreview(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showPreview = false;
    this.selectedPreview = '';
    this.selectedFileType = '';
  }
}
