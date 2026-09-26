---
title: 나만의 이모지 프리셋 만들기
icon: emoji
---

이 요리책에서는 나만의 이모지 프리셋을 만들고 사용하는 방법을 보여줍니다.

<!-- more -->

## 나만의 프리셋 만들기

먼저 이모지 이미지 몇 개를 준비해야 합니다. 그런 다음 다음 단계를 따라 프리셋을 만드세요.

### 이모지 이름 지정 및 업로드

간단함을 위해 Waline은 이모지 이미지의 이름을 이모지의 키로 직접 사용합니다. 이는 두 가지 다른 프리셋을 가져오고 둘 다 laugh.png 이미지를 포함하는 경우, 두 이모티콘 모두 동일한 이모지 `:laugh:`에 해당된다는 것을 의미합니다.

따라서 모범 사례는 각 이모지 프리셋 제작자가 이모지 파일의 모든 이름에 프리셋 이름 관련 접두사를 추가하는 것입니다.

적절하게 이름을 지정한 후 서버에 업로드해야 합니다.

### 프리셋 정보 작성

다음과 같은 이모지 이미지를 배치했다고 가정합니다

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

이 시점에서 Waline이 이모지 프리셋에 포함된 이모지를 알 수 있도록 이 폴더에 `info.json` 파일도 만들어야 합니다.

먼저 이모지 프리셋의 이름을 설정합니다. 예를 들어 `My Emoji`로 설정하고, 이미지에 `my_` 접두사를 설정했으며 파일은 `png` 형식입니다. `info.json`에 이를 추가해야 합니다.

Your `info.json` can be:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png"
}
```

그런 다음 원하는 순서대로 `items`에 모든 이모지 이름을 나열하세요. 동시에 `prefix`와 `type`에 설정한 접두사와 접미사를 생략해야 합니다.

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute"
}
```

그런 다음 탭에 표시될 아이콘으로 대표적인 이모지를 선택하세요:

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

이것으로 `info.json` 작성이 완료되었습니다. 동일한 폴더에 업로드하세요.

이제 `https://example.com/my-emoji/'`로 `my-emoji` 프리셋을 성공적으로 만들었습니다.

## 태그를 사용한 GitHub 미러 사용

일반적으로 자체 도메인 이름을 소유하고 도메인에 이미지를 업로드하는 것이 다소 번거로울 수 있으며, 시간이 지남에 따라 링크가 만료될 수 있습니다. 따라서 고급 방법은 GitHub 저장소를 사용하고 git의 태그 기능을 사용하여 GitHub 저장소를 미러링하여 이모지 프리셋을 제공하는 것입니다.

위의 단계와 마찬가지로 새 GitHub 저장소를 만들고, 위와 같이 이모지 이름을 지정하고, 동일한 단계를 사용하여 `info.json`을 만들어 저장소에 업로드하세요.

그런 다음 이 시점에서 저장소에 태그를 만드세요. `vx.x.x` 형식(e.g. `v1.0.0`)으로 설정하는 것을 권장합니다.

태그를 추가한 후 [cdn.jsdelivr.net](https://www.jsdelivr.com/)에서 버전이 포함된 CDN 링크를 `https://cdn.jsdelivr.net/gh/user/repo@version/file` 형식으로 프리셋으로 사용할 수 있습니다.

`example/emoji` 저장소를 만들고, 이모지 이미지와 `info.json`을 직접 업로드하고, `v1.0.0` 태그를 만들었다고 가정하면, `https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/`를 프리셋으로 사용할 수 있습니다.

::: tip

프리셋을 수정하여 이전 댓글에서 참조하는 이미지 링크가 무효화되는 것을 방지하기 위해 태그를 링크와 함께 지정하는 것이 필요합니다.

공식 이모지 프리셋은 [walinejs/emojis](https://github.com/walinejs/emojis) 저장소를 만들고 CDN 링크를 사용하여 구현됩니다. 현재 `v1.1.0` 버전을 사용하고 있습니다.

:::

::: warning

cdn.jsdelivr.net이 중국에서 오염되어 있으므로 `cdn.jsdelivr.net`을 `gcore.jsdelivr.net`로 대체할 수 있습니다

:::

## 구성 객체 사용

이전 글과 마찬가지로 다음과 같은 파일 구조가 있다고 가정합니다:

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

`info.json`을 만들어 업로드하고 링크를 프리셋으로 사용하는 것 외에도, 다음 객체를 프리셋으로 직접 사용할 수도 있습니다:

```js
{
  name: "My Emoji",
  folder: "https://example.com/my-emoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

여기에서는 Waline에 이미지가 저장된 위치를 알려주기 위해 `folder` 속성을 추가로 넣습니다.
