import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { FileUploadComponent } from './file-upload.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/File Upload',
  component: FileUploadComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    multiple: { control: { type: 'boolean' } },
    acceptedFormats: { control: { type: 'object' } },
    maxSizeMB: { control: { type: 'number' } },
    filesSelected: { action: 'filesSelected' },
  },
} as Meta<FileUploadComponent>;

const Template: StoryFn<FileUploadComponent> = (args) => ({
  props: {
    ...args,
    filesSelected: action('filesSelected'),
  },
});

export const Default = Template.bind({});
Default.args = {
  multiple: true,
  acceptedFormats: ['.jpg', '.png', '.pdf', '.docx'],
  maxSizeMB: 5,
  maxFiles: 5,
  autoUpload: false,
};

export const ImageUpload = Template.bind({});
ImageUpload.args = {
  multiple: true,
  acceptedFormats: ['.jpg', '.png'],
  maxSizeMB: 5,
};

export const SingleFileUpload = Template.bind({});
SingleFileUpload.args = {
  multiple: false,
  acceptedFormats: ['.pdf'],
  maxSizeMB: 2,
};
