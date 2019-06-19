import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: [ './textarea.component.css' ]
})
export class TextareaComponent implements OnInit {

  /** Number of rows of the textarea element */
  readonly TEXTAREA_NUM_ROWS = 20;

  /** Form Control that tracks the value and validation status of the textarea element */
  textAreaFormControl: FormControl;
  /** Is true when the textarea element receives a dragover event */
  textAreaIsDragOver = false;


  constructor() {
  }

  ngOnInit() {
    // Initialize the form control with empty value ('') and
    // with required validator (if the value is empty, an error is raised)
    this.textAreaFormControl = new FormControl('', [ Validators.required ]);
  }

  /**
   * Returns the current value of the textarea element.
   */
  getValue(): string {
    return this.textAreaFormControl.value;
  }

  /**
   * Marks the form control of the textarea element as touched.
   * This allows the FormControl Validators show an error message if the textarea content is invalid.
   */
  markFormControlAsTouched() {
    this.textAreaFormControl.markAsTouched();
  }

  /**
   * Avoids the default drop handler of the element.
   */
  allowDrop($event: DragEvent) {
    console.log('dragOver event on textarea');
    // By default, an element doesn't allow to drop another element on it
    // To allow this, we need to avoid the default handler of the element
    $event.preventDefault();

    // Set to true that the textarea has received a dragover event
    this.textAreaIsDragOver = true;
  }

  /**
   * Obtains the file from the drop event, reads it's content and stores it in the textarea.
   */
  drop($event: DragEvent) {
    console.log('drop event on textarea');
    // The textarea isn't dragovered
    this.textAreaIsDragOver = false;

    $event.preventDefault();

    // Obtain the text of the file
    const dt = $event.dataTransfer;
    this.readFile(dt.files[ 0 ]);
  }

  /**
   * Returns the message error for the textarea that corresponds to the error in it's current value.
   */
  getTextareaErrorMessage() {
    return this.textAreaFormControl.hasError('fileType') ? 'El fichero debe ser de tipo texto' :
      this.textAreaFormControl.hasError('required') ? 'Debes introducir un texto' :
        '';
  }

  // TODO: Move this method to UtilsService?
  /**
   * Reads the content of the file and stores it in the textarea, using the HTML5 File API.
   */
  private readFile(file: File) {
    // If the user cancels the operation of dropping a file
    if (file == null) {
      return;
    }

    // Clean the textarea content
    this.textAreaFormControl.setValue('');
    // Remove error message of previous file dropped
    this.textAreaFormControl.setErrors(null);

    // Only admits text files
    if (file.type.match('text/plain')) {
      // Read the file content
      const fileReader = new FileReader();
      // The FileReader "onload" event is called when the read operation over the file finishes
      // The file content is stored in the "result" property of the FileReader
      fileReader.onload = () => {
        // Set the file content in the textarea value
        this.textAreaFormControl.setValue(fileReader.result.toString());
      };
      fileReader.readAsText(file);
    } else {
      // Mark the textarea as touched to allow the FormControl Validators show an error
      this.markFormControlAsTouched();
      // Manually set an error about the file type in the textarea
      this.textAreaFormControl.setErrors({ fileType: true });

      console.log('File type not valid! Only text files are admitted.');
    }
  }

}
