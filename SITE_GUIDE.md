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

## Mobile optimization v5.5 — 27 October 2026

- Mobile header: brand plus accessible Menu/Close control. Under 781 px, both CV PDF links move into the mobile menu, alongside section navigation and email. From 781–1020 px the CV links remain visible in the header.
- Menu: full-width scrollable panel with safe viewport height; closes via menu button, link selection, outside click, Escape, or breakpoint change. Background scroll is suppressed while open.
- Typography and grids: breakpoints at 1020, 780, 650, 390 and 350 px; preserve at least 44 px touch controls; project years remain visible in the narrow project list; long titles and sources wrap.
- Project slideshow: larger copy region and touch controls, responsive heights and swipe navigation. Auto-advance is suspended while the slider is outside the viewport, and disabled when reduced-motion is requested.
- All page sections, PDF actions and content data were checked by executing the JavaScript with a simulated DOM, including menu open/close and Escape. Full real-device visual inspection is still advisable before signing off.
- Production HTML links are versioned via `?v=20261027-mobile2` to avoid stale browser cache.

## 27 October 2026 — Minimal icons and scrolling navigation (v5.6)

- All user-facing arrow glyphs used for downloads, external links, carousel controls and back-to-top were replaced by monochrome inline SVG icons to avoid platform-specific emoji rendering.
- A contextual section index appears automatically after scrolling into the content. At widths below 1550 px it is a compact tab along the right edge: the tab shows the current Roman numeral, and tapping it reveals section names. At 1550 px and wider the section list remains visible in the outer margin.
- The side navigation opens collapsed sections by reusing the existing anchor behavior, indicates the current section, and closes via Escape, selecting an entry or clicking outside.
- The floating rail is hidden while the mobile header menu is open.
- Relevant files: `assets/portfolio-v5.js`, `assets/portfolio-v5.css`, `index.html`. Static asset cache version: `20261027-rail2`.
- Smoke tests covered HTML rendering, section visibility, side-rail state and interactions, and simultaneous operation with the mobile header menu.


## UX refinement — 27 October 2026 (v5.7)

- Education, About, Software and Additional use one accessible full-width button per section, including their Roman numeral and right-side cross. Every part of the heading row opens or closes its panel.
- Hover and keyboard focus highlight the numeral, heading and cross in blue, with visible keyboard focus outlines.
- The cross animates into a near-horizontal diagonal instead of a minus: the vertical stroke rotates by 75 degrees, ending 15 degrees from the horizontal. This applies consistently to project, education, software and source accordions.
- The kicker ACADEMIC & ENGINEERING PORTFOLIO transfers into the sticky header when scrolling triggers the side navigation. On narrow phones the shorter ACADEMIC / ENGINEERING label fits beside the menu.
- The header Email action now navigates to About → Contact and automatically expands the About section. There visitors can use the mailto link or copy the address directly; this avoids depending solely on a locally configured email app.
- Back to top has an explicit window.scrollTo handler and removes the old hash after navigation; reduced-motion preference is respected.
- Javascript, data rendering, accordion interaction, copy-email and scroll handling were exercised with a simulated DOM. Real-device visual review remains recommended.
- Cache-busted release: 20261027-polish1.


## Alarchin Bridge media inside the project card — 19 November 2026

- Alarchin materials are rendered inside the existing expandable project card in `content/projects.json`; the standalone case-study page and its stylesheet have been removed.
- Pages CMS exposes four visualisations, seven ordered calculation illustrations, two individual drawing PDFs, the complete eight-sheet drawing set, a one-page calculation summary and the English 44-slide presentation.
- Image previews open in a full-viewport viewer with previous/next navigation and keyboard arrow support.
- Upload the files from `alarchin_site_package/media/images/` to `media/images/` and files from `alarchin_site_package/media/docs/` to `media/docs/`. The package README contains the exact file mapping.
- The full presentation is published as PDF for browser viewing; the editable PPTX is not included in the public media set.

## Project inventory reset — 27 November 2026

- The completed Alarchin Bridge case study (two visualisations, seven calculation illustrations and five PDFs) remains published, including its award recognition.
- Eight earlier text-only project entries and their unused media have been removed from the current branch to prepare for fresh, individually reviewed project packages. The preceding commit retains the original material in Git history.
- Empty project categories are not rendered. Academic and professional categories appear automatically when corresponding visible project records are added.
- The asset manifest is reconciled with the retained project files. Future project packages should be reviewed for confidentiality, added under unique project slugs, and checked for missing links before publication. Software entries, CVs and other sections remain unchanged.

## Orthotropic-deck bridge project — 27 November 2026

- A hidden academic-project draft is prepared in `content/projects.json` under slug `orthotropic-deck-bridge-superstructure`.
- The source package contains an explanatory note, a separate 28-page SOFiSTiK calculation report, and two one-page drawing PDFs. The main explanatory-note PDF contains 149 PDF pages; its title block states 146 sheets.
- The design compares three superstructure variants. Variant 1 is selected as the most economically advantageous; its stated span arrangement is 42.30 + 6 × 63.00 + 42.30 m, total length 473.57 m and opening 436.00 m.
- The draft uses separate Visualisations, Design alternatives, Calculation illustrations, Technical drawings, Critical calculation results, and Project documents sections. The renderer supports `design_alternatives` and `grouped_documents` for projects using the Alarchin-style hierarchy.
- Project media paths are prepared under `media/images/orto-*` and `media/docs/orto-*`. The draft remains hidden until all binary assets are uploaded and verified; `asset-manifest.json` must then be updated.
- Key reported results include main-girder normal stress 259.29/295 MPa, main-girder shear stress 68.94/171.76 MPa, orthotropic-deck strength/stability checks, a 4.17 s first-mode period at 293 m of launching against a 3.00 s criterion, and a reported need for a temporary support in span 7.
- Review note: the source deflection check prints 63/400 = 0.01575 m, although the arithmetic is 0.1575 m; do not present the deflection check as verified until the source calculation is corrected or confirmed.

## Orthotropic-deck bridge published — 27 November 2026

- All 19 uploaded media files match the prepared package by Git blob SHA. The project is visible under Academic projects; the source explanatory note is retained without correcting its arithmetic typo, and that deflection verification remains excluded from the result cards.
- The `gallery_carousel` project option enables separate manual horizontal carousels for visualisations, alternatives and calculation illustrations. Desktop shows three images, tablet two, phone one; arrows advance one image, native horizontal scrolling supports swipe, and the existing full-screen viewer remains available. No autoplay is used for technical evidence.
- Drawing previews and grouped project documents retain the Alarchin-style layout. The 19 media paths are added to the asset manifest. No other project content is changed.

## Project gallery and desktop layout refinement — 27 November 2026

- On wide screens (1550 px and above), the page container expands responsively to a maximum 1500 px while reserving space for the fixed right-side section index.
- Project image canvases are pure white. Main visualisations preserve their original aspect ratio and are not cropped.
- For a project with carousel mode enabled, galleries with four or fewer images render as a full-width vertical stack. Galleries with five or more images retain manual horizontal navigation (three visible on desktop, two on tablet, one on mobile). Existing Alarchin galleries are not changed by this project-specific rule.

## Hero preview and Orto visualisation layout — 27 November 2026

- The selected-works preview on desktop is lowered by 34 px and its minimum height is increased to 620 px (viewport minimum 470 px), providing a larger image window. This adjustment applies above 1100 px; tablet and mobile layouts retain their existing geometry.
- Orto Visualisations now use a two-column grid rather than a vertical stack. At widths below 780 px the images return to a single column for legibility. The six Design Alternatives and five Calculation Illustrations remain in their manual carousels.
