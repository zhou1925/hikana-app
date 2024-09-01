export const hiraganaCharacters = [
    'あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や', 'ゆ', 'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'を', 'ん'
  ];
  
  export const katakanaCharacters = [
    'ア', 'イ', 'ウ', 'エ', 'オ',
    'カ', 'キ', 'ク', 'ケ', 'コ',
    'サ', 'シ', 'ス', 'セ', 'ソ',
    'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
    'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ',
    'ヤ', 'ユ', 'ヨ',
    'ラ', 'リ', 'ル', 'レ', 'ロ',
    'ワ', 'ヲ', 'ン'
  ];
  
  export function getRandomHiragana() {
    const randomIndex = Math.floor(Math.random() * hiraganaCharacters.length);
    return hiraganaCharacters[randomIndex];
  }
  
  export function getRandomKatakana() {
    const randomIndex = Math.floor(Math.random() * katakanaCharacters.length);
    return katakanaCharacters[randomIndex];
  }
  
  export function getRandomCharacter(includeHiragana, includeKatakana) {
    const characters = [
      ...(includeHiragana ? hiraganaCharacters : []),
      ...(includeKatakana ? katakanaCharacters : [])
    ];
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }