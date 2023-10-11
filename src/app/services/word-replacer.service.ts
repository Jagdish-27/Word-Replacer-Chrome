import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordReplacerService {
  constructor() {}

  replaceWords(oldWord: string, newWord: string, text: string): string {

    return text.replace(new RegExp(oldWord, 'gi'), newWord ? newWord:'');
  }
}
