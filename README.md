# Hiragana KATAKANA Practice App

(made with claude3 help)
## Description

The Hiragana Practice App is an interactive web application designed to help users learn and practice writing Hiragana characters. It provides a user-friendly interface for drawing characters, receiving feedback, and tracking progress.

## Features

- Interactive canvas for drawing Hiragana characters
- Multiple practice modes: Free, Exam, and Guided
- Adjustable difficulty levels
- SRS (Spaced Repetition System) integration for optimized learning
- Progress tracking and statistics
- Character type selection (Hiragana and Katakana)
- Customizable canvas settings
- Audio pronunciation (planned feature)
- Drawing similarity comparison algorithm (it is weak at the moment, redraw if you get bad feedback)

## Usage

- Select your preferred practice mode (Free, Exam, or Guided)
- Choose the difficulty level
- Draw the displayed Hiragana character on the canvas
- Receive feedback on your drawing
- Progress through characters and track your improvement

## Technologies Used

- React.js
- HTML5 Canvas
- Local Storage API
- Tailwind CSS

## Technical Details

### Similarity Algorithm

The app uses a pixel-based comparison algorithm to determine the similarity between the user's drawing and the correct character:

1. Both the user's drawing and the correct character are rendered on separate canvases.
2. The pixel data from both canvases is extracted.
3. Each pixel from the user's drawing is compared with the corresponding pixel from the correct character.
4. The number of matching pixels is counted.
5. The similarity score is calculated as the ratio of matching pixels to total pixels.

This algorithm provides a basic measure of similarity, with higher scores indicating a closer match to the correct character. However, it has limitations:

- It's sensitive to slight positioning differences.
- It doesn't account for stroke order or direction.
- It may not accurately reflect human perception of similarity.

Future improvements could include more sophisticated image processing techniques or machine learning-based approaches for more accurate similarity assessment.

## Internationalization

This app supports both English and Spanish languages. Users can switch between languages using the language selector at the top of the app. To add more languages:
