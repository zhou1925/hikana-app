export const hiraganaCharacters = [
    'あ', 'い', 'う', 'え', 'お',
    // ... 
  ];
  
  export const katakanaCharacters = [
    'ア', 'イ', 'ウ', 'エ', 'オ',
    // ... 
  ];
  
  export const kanjiCharacters = [
    '日', '月', '火', '水', '木', '金', '土',
    '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
    '百', '千', '万', '円', '年', '中', '大', '小', '山', '川', '田',
    // ...
  ];
  
  export function getRandomHiragana() {
    return getRandomCharacter(hiraganaCharacters);
  }
  
  export function getRandomKatakana() {
    return getRandomCharacter(katakanaCharacters);
  }
  
  export function getRandomKanji() {
    return getRandomCharacter(kanjiCharacters);
  }
  
  function getRandomCharacter(characterSet) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    return characterSet[randomIndex];
  }
  
  export function getRandomCharacter(includeHiragana, includeKatakana, includeKanji) {
    const characters = [
      ...(includeHiragana ? hiraganaCharacters : []),
      ...(includeKatakana ? katakanaCharacters : []),
      ...(includeKanji ? kanjiCharacters : [])
    ];
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }