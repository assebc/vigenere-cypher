import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

  readonly inputSignal = signal('');
  readonly keySignal = signal('');
  readonly outputSignal = signal('');

  updateInput($event: any): void {
    const nextInput: string = $event.target.value;
    this.inputSignal.set(nextInput.toUpperCase());
  }

  updateKey($event: any): void {
    const nextKey: string = $event.target.value;
    this.keySignal.set(nextKey.toUpperCase());
  }

  encrypt(): void {
    const encryptedText: string = this.vigenereCypher();
    this.outputSignal.set(encryptedText);
  }

  private vigenereCypher(): string {
    let res = '';
    const input = this.inputSignal();
    const normalizedKey = this.matchKeyAndInputLength(input, this.keySignal());

    for (let i = 0; i < input.length; i++) {
      const inputChar = input[i].toUpperCase();
      const keyChar = normalizedKey[i].toUpperCase();
      const inputIndex = this.alphabet.indexOf(inputChar);
      const keyIndex = this.alphabet.indexOf(keyChar);
      const encryptedIndex = (inputIndex + keyIndex) % this.alphabet.length;
      res += this.alphabet[encryptedIndex];
    }

    return res.toUpperCase();
  }

  private matchKeyAndInputLength(input: string, key: string): string {
    let res = key;
    const inputLength = input.length;
    const keyLength = key.length;

    if (keyLength < inputLength) {
      const diff = inputLength - keyLength;
      const keyArray = key.split('');
      for(let i = 0; i < diff; i++) {
        res += keyArray[i % keyLength];
      }
    }

    if (keyLength > inputLength) {
      res = key.slice(0, inputLength);
    }

    return res;
  }
}
