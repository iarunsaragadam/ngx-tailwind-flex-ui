import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { ElementRef } from '@angular/core';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let originalDate: typeof Date;

  beforeEach(async () => {
    // Preserve the original Date before any mocking
    originalDate = Date;

    // Create a mock Date constructor that extends the original Date
    const MockDate = class extends originalDate {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...args: any[]) {
        if (
          args.length === 0 ||
          (args.length === 1 && args[0] === '2023-01-01')
        ) {
          super('2023-01-01');
        } else {
          return Reflect.construct(originalDate, args, MockDate);
        }
      }
    } as unknown as DateConstructor;

    // Assign static methods from original Date to MockDate
    Object.setPrototypeOf(MockDate, originalDate);
    MockDate.now = jest.fn(() => 1672531200000); // Mock Date.now separately

    // Apply the mock to global.Date
    global.Date = MockDate;

    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');

    await TestBed.configureTestingModule({
      imports: [FileUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Restore global.Date to its original state
    global.Date = originalDate;
    jest.restoreAllMocks(); // Restore all mocks, including URL.createObjectURL
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly identify previewable files', () => {
    expect(component.isPreviewable('image/png')).toBeTruthy();
    expect(component.isPreviewable('image/jpeg')).toBeTruthy();
    expect(component.isPreviewable('application/pdf')).toBeTruthy();
    expect(component.isPreviewable('video/mp4')).toBeTruthy();
    expect(component.isPreviewable('audio/mpeg')).toBeTruthy();
    expect(component.isPreviewable('application/msword')).toBeTruthy();
    expect(
      component.isPreviewable(
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      )
    ).toBeTruthy();
    expect(component.isPreviewable('text/plain')).toBeFalsy();
  });

  it('should open image preview modal when clicking on an image file', () => {
    const file = new File(['dummy content'], 'image.jpg', {
      type: 'image/jpeg',
    });
    component.filePreviews[file.name] = 'data:image/jpeg;base64,dummyData';
    component.selectedFiles = [file];

    component.openPreview(file.name);

    expect(component.showPreview).toBeTruthy();
    expect(component.selectedPreview).toBe('data:image/jpeg;base64,dummyData');
    expect(component.selectedFileType).toBe('image/jpeg');
  });

  it('should open a PDF file in a new tab', () => {
    const file = new File(['dummy content'], 'document.pdf', {
      type: 'application/pdf',
    });
    component.selectedFiles = [file];

    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    component.openPreview(file.name);

    expect(openSpy).toHaveBeenCalledWith('blob:mock-url', '_blank');
    expect(component.showPreview).toBeFalsy();

    openSpy.mockRestore();
  });

  it('should open a video file in a new tab', () => {
    const file = new File(['dummy content'], 'video.mp4', {
      type: 'video/mp4',
    });
    component.selectedFiles = [file];

    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    component.openPreview(file.name);

    expect(openSpy).toHaveBeenCalledWith('blob:mock-url', '_blank');
    expect(component.showPreview).toBeFalsy();

    openSpy.mockRestore();
  });

  it('should open a `.docx` file in a new tab', () => {
    const file = new File(['dummy content'], 'document.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    component.selectedFiles = [file];

    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    component.openPreview(file.name);

    expect(openSpy).toHaveBeenCalledWith('blob:mock-url', '_blank');
    expect(component.showPreview).toBeFalsy();

    openSpy.mockRestore();
  });

  it('should close image preview modal', () => {
    component.showPreview = true;
    component.selectedPreview = 'data:image/png;base64,dummyData';
    component.selectedFileType = 'image/png';

    component.closePreview();

    expect(component.showPreview).toBeFalsy();
    expect(component.selectedPreview).toBe('');
    expect(component.selectedFileType).toBe('');
  });

  it('should set focus on close button when preview opens', fakeAsync(() => {
    const buttonElement = document.createElement('button');
    const focusSpy = jest.spyOn(buttonElement, 'focus');

    component.closeButton = new ElementRef<HTMLButtonElement>(buttonElement);
    component.selectedFiles = [
      new File(['dummy content'], 'image.jpg', { type: 'image/jpeg' }),
    ];
    component.filePreviews['image.jpg'] = 'data:image/jpeg;base64,dummyData';

    component.openPreview('image.jpg');
    tick(0);

    expect(focusSpy).toHaveBeenCalled();
  }));

  it('should accept valid file types', () => {
    component.acceptedFormats = ['.jpg', '.png'];
    const validFile = new File(['dummy content'], 'image.jpg', {
      type: 'image/jpeg',
    });
    expect(component.validateFile(validFile)).toBeTruthy();
  });

  it('should reject invalid file types', () => {
    component.acceptedFormats = ['.jpg', '.png'];
    const invalidFile = new File(['dummy content'], 'document.pdf', {
      type: 'application/pdf',
    });
    expect(component.validateFile(invalidFile)).toBeFalsy();
    expect(component.errorMessage).toContain('unsupported format');
  });

  it('should enforce file size limits', () => {
    component.maxSizeMB = 2;

    const validFile = new File(['dummy content'], 'image.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(validFile, 'size', { value: 1 * 1024 * 1024 });

    const largeFile = new File(['dummy content'], 'large.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(largeFile, 'size', { value: 3 * 1024 * 1024 });

    expect(component.validateFile(validFile)).toBeTruthy();
    expect(component.validateFile(largeFile)).toBeFalsy();
    expect(component.errorMessage).toContain('exceeds the size limit');
  });

  it('should reject empty files', () => {
    const emptyFile = new File([], 'empty.jpg', { type: 'image/jpeg' });
    Object.defineProperty(emptyFile, 'size', { value: 0 });

    expect(component.validateFile(emptyFile)).toBeFalsy();
    expect(component.errorMessage).toContain('is empty');
  });

  it('should process files from file input', () => {
    const file = new File(['dummy content'], 'test.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 });

    const mockInput = {
      files: [file],
      value: 'initial',
    } as unknown as HTMLInputElement;
    const event = { target: mockInput } as unknown as Event;

    const processFilesSpy = jest.spyOn(component, 'processFiles');

    component.onFileSelect(event);

    expect(processFilesSpy).toHaveBeenCalledWith([file]);
    expect(mockInput.value).toBe('');
  });

  it('should set dragging state on drag over', () => {
    const event = { preventDefault: jest.fn() } as unknown as DragEvent;

    component.onDragOver(event);

    expect(component.isDragging).toBeTruthy();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should clear dragging state on drag leave', () => {
    component.isDragging = true;

    component.onDragLeave();

    expect(component.isDragging).toBeFalsy();
  });

  it('should process dropped files', () => {
    const file = new File(['dummy content'], 'drop.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 });
    const event = {
      preventDefault: jest.fn(),
      dataTransfer: { files: [file] },
    } as unknown as DragEvent;

    const processFilesSpy = jest.spyOn(component, 'processFiles');

    component.onDrop(event);

    expect(component.isDragging).toBeFalsy();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(processFilesSpy).toHaveBeenCalledWith([file]);
  });

  it('should enforce max files limit in single mode', () => {
    component.multiple = false;
    const file1 = new File(['content'], 'file1.jpg', { type: 'image/jpeg' });
    Object.defineProperty(file1, 'size', { value: 1 * 1024 * 1024 });
    const file2 = new File(['content'], 'file2.jpg', { type: 'image/jpeg' });
    Object.defineProperty(file2, 'size', { value: 1 * 1024 * 1024 });

    component.processFiles([file1]);
    expect(component.selectedFiles.length).toBe(1);

    component.processFiles([file2]);
    expect(component.selectedFiles.length).toBe(1);
    expect(component.errorMessage).toBe(
      '❗ Maximum files limit of 1 reached. Remove existing files to add new ones'
    );
  });

  it('should enforce max files limit in multi mode', () => {
    component.multiple = true;
    component.maxFiles = 2;
    const files = [
      new File(['content'], 'file1.jpg', { type: 'image/jpeg' }),
      new File(['content'], 'file2.jpg', { type: 'image/jpeg' }),
      new File(['content'], 'file3.jpg', { type: 'image/jpeg' }),
    ];
    files.forEach((file) =>
      Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 })
    );

    component.processFiles(files.slice(0, 2));
    expect(component.selectedFiles.length).toBe(2);

    component.processFiles([files[2]]);
    expect(component.selectedFiles.length).toBe(2);
    expect(component.errorMessage).toBe(
      '❗ Maximum files limit of 2 reached. Remove existing files to add new ones'
    );
  });

  it('should reject duplicate file names', () => {
    const file = new File(['content'], 'file.jpg', { type: 'image/jpeg' });
    Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 });

    component.processFiles([file]);
    expect(component.selectedFiles.length).toBe(1);

    component.processFiles([file]);
    expect(component.selectedFiles.length).toBe(1);
    expect(component.errorMessage).toContain('is already in the list');
  });

  it('should emit filesSelected event with valid files', () => {
    const file = new File(['content'], 'file.jpg', { type: 'image/jpeg' });
    Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 });

    const emitSpy = jest.spyOn(component.filesSelected, 'emit');

    component.processFiles([file]);

    expect(emitSpy).toHaveBeenCalledWith([file]);
  });

  it('should trigger upload when autoUpload is true', () => {
    component.autoUpload = true;
    const file = new File(['content'], 'file.jpg', { type: 'image/jpeg' });
    Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 });

    const uploadSpy = jest.spyOn(component, 'uploadFiles');

    component.processFiles([file]);

    expect(uploadSpy).toHaveBeenCalled();
  });

  it('should initiate file removal and show confirmation modal', () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    component.selectedFiles = [file];

    component.initiateFileRemoval(0);

    expect(component.showDeleteConfirmation).toBeTruthy();
    expect(component.fileToDeleteIndex).toBe(0);
  });

  it('should remove file on confirmation', () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    component.selectedFiles = [file];
    component.filePreviews[file.name] = 'data:image/png;base64,dummy';
    component.uploadProgress[file.name] = 50;
    component.uploadStatus[file.name] = true;
    component.pausedUploads[file.name] = true;
    component.fileToDeleteIndex = 0;
    component.showDeleteConfirmation = true;

    const emitSpy = jest.spyOn(component.filesSelected, 'emit');

    component.confirmFileRemoval();

    expect(component.selectedFiles.length).toBe(0);
    expect(component.filePreviews[file.name]).toBeUndefined();
    expect(component.uploadProgress[file.name]).toBeUndefined();
    expect(component.uploadStatus[file.name]).toBeUndefined();
    expect(component.pausedUploads[file.name]).toBeUndefined();
    expect(component.showDeleteConfirmation).toBeFalsy();
    expect(component.fileToDeleteIndex).toBeNull();
    expect(emitSpy).toHaveBeenCalledWith([]);
  });

  it('should cancel file removal and keep file', () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    component.selectedFiles = [file];
    component.fileToDeleteIndex = 0;
    component.showDeleteConfirmation = true;

    component.cancelFileRemoval();

    expect(component.selectedFiles.length).toBe(1);
    expect(component.showDeleteConfirmation).toBeFalsy();
    expect(component.fileToDeleteIndex).toBeNull();
  });

  it('should toggle pause/resume for file upload', () => {
    const file = new File(['dummy content'], 'upload.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 });
    component.processFiles([file]);

    expect(component.pausedUploads[file.name]).toBeFalsy();

    component.togglePause(file.name);
    expect(component.pausedUploads[file.name]).toBeTruthy();

    component.togglePause(file.name);
    expect(component.pausedUploads[file.name]).toBeFalsy();
  });

  it('should toggle isUploading flag during upload', fakeAsync(() => {
    const file = new File(['dummy content'], 'upload.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 });

    component.processFiles([file]);
    component.uploadFiles();

    expect(component.isUploading).toBeTruthy();

    tick(3000); // 2500ms for upload + 500ms cleanup
    expect(component.isUploading).toBeFalsy();
  }));

  it('should emit filesUploaded event on successful upload', fakeAsync(() => {
    const file = new File(['dummy content'], 'upload.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 });

    component.processFiles([file]);
    const emitSpy = jest.spyOn(component.filesUploaded, 'emit');

    component.uploadFiles();
    tick(3000); // 2500ms for upload + 500ms cleanup

    expect(emitSpy).toHaveBeenCalledWith([file]);
    expect(component.errorMessage).toBe('✅ Upload completed successfully');
  }));

  it('should reject upload when no files are selected', () => {
    component.selectedFiles = [];

    component.uploadFiles();

    expect(component.errorMessage).toBe('❗ Please select the file');
    expect(component.isUploading).toBeFalsy();
  });

  it('should reject upload when all files are already uploaded', () => {
    const file = new File(['dummy content'], 'upload.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 });
    component.selectedFiles = [file];
    component.uploadStatus[file.name] = true;

    component.uploadFiles();

    expect(component.errorMessage).toBe(
      '❗ All selected files are already uploaded. Please select new files to upload'
    );
    expect(component.isUploading).toBeFalsy();
  });

  it('should reject upload during active upload', fakeAsync(() => {
    const file = new File(['dummy content'], 'upload.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(file, 'size', { value: 1 * 1024 * 1024 });

    component.processFiles([file]);
    component.uploadFiles();
    expect(component.isUploading).toBeTruthy();

    component.uploadFiles();
    expect(component.errorMessage).toBe(
      '❗ Please wait for current uploads to complete'
    );

    tick(3000); // Complete the upload
  }));
});
