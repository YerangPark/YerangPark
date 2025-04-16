import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `### 🪚 주요 기술
![image](https://github.com/user-attachments/assets/6f402edf-4a7d-401a-8c23-643413a2fe50)


### 🔭 하고 있는 일
#### \`2024. 4 ~ \`

FE 공부 및 프로젝트를 진행하며 취업 준비중입니다.

#### \`2021. 5 ~ 2024. 4.\`

[아이디스](https://www.idisglobal.com/)에서 임베디드 F/W 및 FE 개발을 담당했습니다.


## 📕 최근 블로그 글
제 개인 글은 주로 Obsidian에 작성하지만 그 중 일부는 [블로그](https://yerang2.tistory.com/)에 적기도 합니다.

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://devpad.tistory.com/rss'); // 본인의 블로그 주소

    text += `<ul>`;

    // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 10; i++) {
        const {title, link} = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
    }

    text += `</ul>`;

    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();