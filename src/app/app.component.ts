import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WordReplacerService } from './services/word-replacer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private wordReplacerService: WordReplacerService) {}

  title = 'word-replacer-chrome';

  result: string = '';

  wordForm = new FormGroup({
    oldWord: new FormControl(''),
    newWord: new FormControl(''),
    text: new FormControl(''),
  });

  replaceWords() {
    const { oldWord, newWord, text } = this.wordForm.value;

    if (!oldWord && !newWord) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please fill the input fields',
      });
      return;
    }

    if (oldWord === newWord) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Old and new word are the same. Please provide different words.',
      });
      return;
    }

    this.result = this.wordReplacerService.replaceWords(
      oldWord as string,
      newWord as string,
      text as string
    );

    if (this.result === text) {
      this.result = 'Word not found!';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Word not found!',
      });
    }

    Swal.fire({
      icon: 'success',
      title: 'Successfull',
      text: 'Word replaced successfully',
    });
    this.result = this.result;
  }

  reset() {
    this.wordForm.reset();
    this.result = '';
  }

  copyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.value = this.result;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Text copied successfully!',
    });
  }

  hasResult() {
    return this.result.trim().length > 0;
  }
}
