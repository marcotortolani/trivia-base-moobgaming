
# Trivia

## by Media Moob

### Designed by Leandro Casali, Developed by Marco Tortolani

---

### Tech Stack

- Preact (_It's very similar to React but a little faster_)
- Vite
- React Router DOM
- SASS
- Prettier
- useSound
- useLocalStorage
- Lotties Files

---

### Configuration and settings

- Categories, questions and answers are setted in the config.json, only in language of the HTML document (index.html).
- The config.json file contains all the data needed to dinamically create this quiz.
- Images are hosted on an S3 Server.
  [URLImagesHost] <https://s3.sa-east-1.amazonaws.com/moob.club/trivias/>

For the images that have text in any language, they are selected in the ConfigProvider component.

- Texts are generated in the ConfigProvider component, using the "lang" parameter to select the specific language needed.

---
