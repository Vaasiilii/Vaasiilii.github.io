# Portfolio — инструкция по редактированию (версия 5)

Сайт: https://vaasiilii.github.io/
Репозиторий: https://github.com/Vaasiilii/Vaasiilii.github.io
Редактор контента: https://app.pagescms.org/

## Ежедневное редактирование без кода

1. Откройте Pages CMS и войдите через GitHub.
2. Выберите репозиторий `Vaasiilii/Vaasiilii.github.io`.
3. В разделе **Profile & design** редактируйте имя, статус исследователя, короткие сведения About, научные интересы и контакты.
4. В разделе **Publications** редактируйте статьи, ссылки на них, а при необходимости — обложки для слайдера.
5. В разделе **Projects** редактируйте учебные и профессиональные работы; для каждого проекта можно добавить `Cover image`, галерею и документы.
6. В разделе **Education** редактируйте дисциплины и компетенции. Для публикации диплома укажите `diploma_url` (PDF) и включите `show_diploma`. Документ отобразится справа при раскрытии записи.
7. В разделе **Software and evidence** можно добавить новую программу и вложить изображения расчётных моделей, чертежи и PDF; выставить `show_media=true`.
8. В разделе **Additional information** можно обновлять сведения о приложениях и спорте.
9. Сохраните изменения. Они попадут в GitHub, после чего GitHub Pages обновит сайт.

## Selected works

Главная страница автоматически чередует до 6 видимых проектов и до 6 публикаций. Порядок определяется порядком записей в JSON.
Переключение — каждые 5 секунд. На сайте есть стрелки, кнопка паузы и свайп.
При наведении мышью или фокусе с клавиатуры автоматическая смена временно останавливается.
В `Profile & design` можно отключить autoplay через `showcase_autoplay`.

## Публикация иллюстраций

Файлы хранятся в `media/images` (изображения) и `media/docs` (PDF).
Публично показываются только материалы, для которых включены соответствующие переключатели. Но **любой файл, загруженный в публичный GitHub-репозиторий, потенциально доступен по прямой ссылке**, даже если он не показывается в интерфейсе.
Не загружайте не предназначенные для публикации документы, персональные данные, рекомендации или закрытые рабочие материалы.

## Изменение дизайна

Внешний вид: `assets/portfolio-v5.css`.
Поведение: `assets/portfolio-v5.js`.
Главная HTML-страница: `index.html`.
Дизайнерские изменения не выполняются через CMS автоматически и требуют редактирования этих файлов.

## Примечания по проектированию

- Минимальная декоративность без потери навигации и смыслового содержания
- Поступательное раскрытие информации (аккордеоны для проектов, образования, программ)
- Автослайдер с возможностью паузы и ручного управления
- Римская нумерация основных разделов
- Боковая навигация с выделением активного раздела появляется на широких экранах после начала прокрутки
- Телефоны и планшеты используют компактную верхнюю навигацию

Методические источники:
- MUJI, What is MUJI: https://www.muji.com/jp/about/en/
- Nielsen Norman Group, Characteristics of Minimalism: https://www.nngroup.com/articles/characteristics-minimalism/
- Nielsen Norman Group, Applying Writing Guidelines: https://www.nngroup.com/articles/applying-writing-guidelines-web-pages/
- W3C WAI Carousel Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/

Изменения v5 проверены по структуре файлов, JSON и синтаксису JavaScript. Фактическое визуальное поведение после публикации необходимо проверить в браузере.

## Обновление v5.1 (27.10.2026)

- В разделе **Profile & design** доступно поле `intro_scope`: кратко о проектировании зданий и мостов. Отдельно отображается `postgraduate_label`, без декоративного тире.
- В `about_sections` редактируются два самостоятельных блока: профессиональная деятельность и исследовательская работа. В каждом есть `label`, `title`, `body` и перечень `points`.
- В `Additional information` каждая запись может содержать массив `links`: подпись `title`, источник `source`, адрес `url`. Ссылки выводятся под описанием с названием публикации, а не как URL.
- Сейчас подключены подтверждённые App Store, Habr, Sport.ru, Sailwave и International 29er Class. Непроверенные ссылки не добавлены.
- Римские номера разделов увеличены и затемнены. Боковая навигация использует ту же гротескную гарнитуру, что и основной интерфейс. Списки компетенций оформлены небольшими точками.
- Новые изменения по-прежнему публикуются автоматически из ветки `main`.

**Технические файлы:** `assets/portfolio-v5.css`, `assets/portfolio-v5.js`, `content/profile.json`, `content/additional.json`, `.pages.yml`.


## 27.10.2026 — спортивный архив

В разделе `Additional information → Competitive sailing` соревнования редактируются через поле **Sailing events (result and article sources)** (`regattas`). Каждое событие содержит год (`year`), название (`competition`), результат (`result`), класс яхты (`class`), необязательные пояснения (`detail`) и источники (`sources`).

Каждый источник содержит `label` (короткий заголовок), `kind` (`Article` или `Results`) и `url`. Страница группирует статьи и протоколы под соответствующей регатой.

Добавлена регата Palamós 2016: 14-е место, Gold Fleet; лидер после первого дня, 2-е место после второго дня. Garda Meeting отсутствует по просьбе владельца.

## 27 October 2026 — Portfolio v5.4

- Main order: Research → Projects → Education → About → Software → Additional information.
- Research and Projects are always visible. Education, About, Software and Additional information start collapsed, with a concise visible summary and accessible section toggle. Hash navigation opens the appropriate section automatically.
- About flows in two columns while professional information and academic links are shown together; the subsequent academic research block uses the full content grid.
- Additional information shows concise activity summaries and highlights; the existing application articles and racing results are retained in independently expanding evidence archives.
- Two downloadable PDFs are stored in `media/docs/Vasilii_Andreev_Work_CV.pdf` and `media/docs/Vasilii_Andreev_PhD_CV.pdf`. They are linked at the top of the website and controlled using `cv_work_url`, `cv_phd_url`, `show_cv_work` and `show_cv_phd` in Profile & design.
- Both CVs are 2-page English editions based on `Andreev_Vasilii_CV.docx` and the verified publication list. They do not contain incomplete project-case descriptions. Research publications with incomplete final bibliographic metadata are clearly noted for later verification.
- Before formal applications, update and verify issue numbers, journal pages and publication status, and decide whether to include private references. Do not publish confidential project documents by default.
