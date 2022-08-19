##  Як користуватися:
- Перейдіть на сторінку реєстрації
- Введіть свої данні у вірному форматі
- Активуйте обліковий запис за допомогою секретного коду: ``0000```
    
 *Якщо ви ввели невірну пошту, ви можете редагувати її до активації облікового запису

## Особливості
1. Не можна зареєструвати або змінити пошту на пошту іншого користувача.
2. Код побудований для максимально ефективного кешування запитів за допомогою RTK Query.
3. Структура проекту заснована на best practics, і дозволяє знаходити необхідний функціонал ґрунтуючись на назві папок.
4. В апі погоди були знайдені незадокументовані особливості, і впроваджені в додаток для покращення взаємодії користувача з даними. Саме це можливість переглядати погоду на більший термін, ніж зазначено в документації.
5. Календар реалізований з можливістю вибору як минулої, так і майбутньої дати, що сильно підвищує зручність інтерфейсу, прибираючи необхідність навігації між історією та прогнозом.
6. Вибрана дата, незалежно від того минула чи майбутня, буде збережена в адресному рядку, і після завантаження викличе правильний ендпоінт "history.json" або "forecast.json"
7. Валідація в авторизації гнучко поєднує в собі функціонал HTML5 валідації та кастомною обробкою помилок написаної відповідно до вимог "material ui"
8. Навігація за програмою без підтвердження пошти неможлива, навіть якщо перезайти до облікового запису.
9. Для локалізації використовувався плагін "i18next" з кастомним "language detector" компонентом, який прибирає зайві перевірки і витягує oбрану мову з local storage.

## Що виконано:
- Реєстрація
```/registration```
- Вхід/Вихід з аккаунту 
```/login```
- Підтвердження пошти за допомогою коду
- Профіль користувача
```/profile```
- Редагування власної інформвції(не дороблене)
- Зміна теми
- Зміна метричної системи
- Пошук міста





## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
