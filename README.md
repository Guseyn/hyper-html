<img src="https://raw.githubusercontent.com/Guseyn/logos/master/ehtml.svg?sanitize=true">

**EHTML (or Extended HTML)** can be described as a set of custom elements that you can put on an HTML page for different purposes and use cases. The main idea and goal of this library is to provide convinient way to get rid of all your JavaScript code on the client side.

# Contents

- [Motivation](#motivation)
- [Usage](#usage)
- [Supported elements](#supported-elements)
- [Suppoted actions on response](#suppoted-actions-on-response)
- [Examples](#examples)

# Motivation

Every moment a new JavaScript framework borns here and there, and each of them claims that it's better than other ones for different irrelevant and stupid reasons. The main problem with all those frameworks is JavaScript. And I like this language very much, but it's painful to maintain. Mostly because it's difficult(or even impossible) to make it completely declarative on the client side. On the other hand, HTML is a completely declarative language, it's easy to read and modify. So, why don't we try to replace JavaScript with HTML where it's possible (or just everywhere).

Thanks to HTML5 it's possible for relevant browsers. Read further and you'll see how you can do it.

# Usage

**EHTML** is very easy to include in your project. Just like jQuery, but all you need to do then is just to write HTML code, not JavaScript. Save [this file](https://github.com/Guseyn/EHTML/blob/master/ehtml.bundle.min.js) locally and use it:

```html
<head>
  <script src="/../js/ehtml.bundle.min.js" type="text/javascript"></script>
</head>
```

# Supported elements

<details>
  <summary><b>E-HTML</b></summary>

  Sometimes html files can be very big, so why not just split them into different smaller html files and put sort of links to them in the main html file? `e-html` allows you to do that by introducing a module system in HTML.

  So, let's say we have main `articles.html` file

  ```html
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en">

    <head>
      <link rel="shortcut icon" href="/../images/favicon.ico"/>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>e-html</title>
      <link rel="stylesheet" href="/../css/main.css">
      <script src="/../js/ehtml.bundle.min.js" type="text/javascript"></script>
    </head>

    <body class="main">
      <div class="articles">

        <e-html data-src="/../html/first.html"></e-html>
        <e-html data-src="/../html/second.html"></e-html>
        <e-html data-src="/../html/third.html"></e-html>
        <e-html data-src="/../html/fourth.html"></e-html>
        <e-html data-src="/../html/fifth.html"></e-html>
        <e-html data-src="/../html/sixth.html"></e-html>

      </div>
    </body>

  </html>
  ```

  and as you can see, we have 6 `e-html` tags there. And each of them refers to some html file which contains some part of the `article.hmtl`. This tag has only one custom attribute `data-src`, which tells us where exactly the file that we want to include is served.

  And for example, `first.html` would look something like this

  ```html
  <div class="article">
    <!-- some content of the first article -->
  </div>
  ```

  And when you open `articles.html` in a browser, it will be rendered as if you included all the parts in one file:

  ```html
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en">

    <head>
      <link rel="shortcut icon" href="/../images/favicon.ico"/>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>e-html</title>
      <link rel="stylesheet" href="/../css/main.css">
      <script src="/../js/ehtml.bundle.min.js" type="text/javascript"></script>
    </head>

    <body class="main">
      <div class="articles">

        <div class="article">
          <!-- content of the first article -->
        </div>
        <div class="article">
          <!-- content of the second article -->
        </div>
        <div class="article">
          <!-- content of the third article -->
        </div>
        <div class="article">
          <!-- content of the fourth article -->
        </div>
        <div class="article">
          <!-- content of the fith article -->
        </div>
        <div class="article">
          <!-- content of the sixth article -->
        </div>

      </div>
    </body>

  </html>
  ```

  The main benefit of using this element is that you can much more easily modify your big html files. So, instead of having one big html file where you have to find a specific part of it to modify, you can just find a file, which contains this specific part and make changes there.

  Of course, this element make an additional http(s) request for fetching a specific part, but you can always cache the files, so it would not cause any performance issues.
</details>

<details>
  <summary><b>E-JSON</b></summary>

  `e-json` allows you to fetch `json` resource by `GET` request from the server and apply some actions on the response. So, for example, let's say you have an endpoint `/album/{title}`, which returns following response:

  ```json
  title = 'Humbug'
  {
    "title": "Humbug",
    "artist": "Arctic Monkeys",
    "type": "studio album",
    "releaseDate": "19 August 2009",
    "genre": "psychedelic rock, hard rock, stoner rock, desert rock",
    "length": "39:20",
    "label": "Domino",
    "producer": "James Ford, Joshua Homme"
  }
  ```

  Then you can fetch it via `e-json` like in following html code:

  ```html
  <e-json
    data-src="/../album/Humbug"
    data-response-name="albumResponse"
    data-actions-on-response="
      mapObjToElm('${albumResponse.body}', '#album-info');
    ">

    <template id="album-info" data-object-name="album">
      <div data-text="Title: ${album.title}"></div>
      <div data-text="Artist: ${album.artist}"></div>
      <div data-text="Type: ${album.type}"></div>
      <div data-text="Release date: ${album.releaseDate}"></div>
      <div data-text="Genre: ${album.genre}"></div>
      <div data-text="Length: ${album.length}"></div>
      <div data-text="Label: ${album.label}"></div>
      <div data-text="Producer: ${album.producer}"></div>
    </template>
  </e-json>
  ```

  So, `e-json` has attributes `data-src` which tells us where from we can fetch `json` response. Attribute `data-response-name` specifies the name that we want to use for the response. It contains `body`, `statusCode` and `headers` properties, so you can use them in the attribute `data-actions-on-response`. In this case we just decided to map `body` of our response to the element with id `album-info`, which also must have attribute `data-object-name`. This attribute specifies the name of the object that we want to map. It's important to mention that you can map object only to an element, which is in `e-json` that provides the object for mapping and also the mapping element must be `<template>`. More details about actions on response you can find in [this section](#suppoted-actions-on-response).

  If you need some request headers, you can specify them in the attribute `data-request-headers` with format `{ "headerName": "headerValue", ... }`.

  You can also add attributes `data-ajax-icon` and `data-progress-bar` as element selectors for presenting progress of fetching data from the server. You can see how to use them in the [examples](#examples).

</details>

<details>
  <summary><b>E-FOR-EACH template</b></summary>

  You can use standard `template` html element with attribute `is="e-for-each"` for iterating some object for mapping to an element. So, let's say you have an endpoint `/album/{title}/songs`, which returns following response:

  ```json
  title = 'Humbug'
  {
    "title": "Humbug",
    "artist": "Arctic Monkeys",
    "songs": [
      { "title": "My Propeller", "length": "3:27" },
      { "title": "Crying Lightning", "length": "3:43" },
      { "title": "Dangerous Animals", "length": "3:30" },
      { "title": "Secret Door", "length": "3:43" },
      { "title": "Potion Approaching", "length": "3:32" },
      { "title": "Fire and the Thud", "length": "3:57" },
      { "title": "Cornerstone", "length": "3:18" },
      { "title": "Dance Little Liar", "length": "4:43" },
      { "title": "Pretty Visitors", "length": "3:40" },
      { "title": "The Jeweller's Hands", "length": "5:42" }
    ]
  }
  ```

  Then your html code would be something like this:

  ```html
  <e-json
    data-src="/../album/Humbug/songs"
    data-response-name="albumResponse"
    data-actions-on-response="
      mapObjToElm('${albumResponse.body}', '#album-info');
    ">

    <tempalte id="album-info" data-object-name="album">

      <div data-text="Title: ${album.title}"></div>
      <div data-text="Artist: ${album.artist}"></div>

      <div><b data-text="${album.songs.length} songs:"></b></div>
      <template is="e-for-each" data-list-to-iterate="${album.songs}" data-item-name="song">
        <div class="song-box">
          <div data-text="No. ${song.index}/${album.songs.length}"></div>
          <div data-text="Title: ${song.title}"></div>
          <div data-text="Length: ${song.length}"></div>
        </div>
      </template>

    </template>
  </e-json>
  ```

  So, as you can see it's pretty straightforward: `e-for-each template` has attribute `data-list-to-iterate` where you can specify the list from the mapped object that you want to iterate. And attribute `data-item-name` specifies the name of the item that you want to map to the `template`. You can also use `index` property of the item in the mapping which starts from 1.

  When you open a browser, `template` will be replaced with its `n` times duplicated inner content for each item, where `n` is the length of the list that has been iterated:

  ```html
  <e-json
    data-src="/../album/Humbug/songs"
    data-response-name="albumResponse"
    data-actions-on-response="
      mapObjToElm('${albumResponse.body}', '#album-info');
    ">

    <div>Title: Humbug</div>
    <div>Artist: Arctic Monkeys</div>

    <div><b>10 songs:</b></div>
    <div class="song-box">
      <div>No. 1/10</div>
      <div>Title: My Propeller</div>
      <div>Length: 3:27</div>
    </div>
    <div class="song-box">
      <div>No. 2/10</div>
      <div>Title: Crying Lightning</div>
      <div>Length: 3:43</div>
    </div>
    <div class="song-box">
      <div>No. 3/10</div>
      <div>Title: Dangerous Animals</div>
      <div>Length: 3:30</div>
    </div>
    <div class="song-box">
      <div>No. 4/10</div>
      <div>Title: Secret Door</div>
      <div>Length: 3:43</div>
    </div>
    <div class="song-box">
      <div>No. 5/10</div>
      <div>Title: Potion Approaching</div>
      <div>Length: 3:32</div>
    </div>
    <div class="song-box">
      <div>No. 6/10</div>
      <div>Title: Fire and the Thud</div>
      <div>Length: 3:57</div>
    </div>
    <div class="song-box">
      <div>No. 7/10</div>
      <div>Title: Cornerstone</div>
      <div>Length: 3:18</div>
    </div>
    <div class="song-box">
      <div>No. 8/10</div>
      <div>Title: Dance Little Liar</div>
      <div>Length: 4:43</div>
    </div>
    <div class="song-box">
      <div>No. 9/10</div>
      <div>Title: Pretty Visitors</div>
      <div>Length: 3:40</div>
    </div>
    <div class="song-box">
      <div>No. 10/10</div>
      <div>Title: The Jeweller's Hands</div>
      <div>Length: 5:42</div>
    </div>

  </e-json>
  ```

</details>

<details>
  <summary><b>E-IF template</b></summary>

   This standard `template` html element with attribute `is="e-if"` decides if some particular part of html needs to be displayed or not while mapping some object to an element. So, let's say you have an endpoint `/album/{title}/songs`, which returns following response:

  ```json
  title = 'Humbug'
  {
    "title": "Humbug",
    "artist": "Arctic Monkeys",
    "songs": [
      { "title": "My Propeller", "length": "3:27" },
      { "title": "Crying Lightning", "length": "3:43" },
      { "title": "Dangerous Animals", "length": "3:30" },
      { "title": "Secret Door", "length": "3:43" },
      { "title": "Potion Approaching", "length": "3:32" },
      { "title": "Fire and the Thud", "length": "3:57" },
      { "title": "Cornerstone", "length": "3:18" },
      { "title": "Dance Little Liar", "length": "4:43" },
      { "title": "Pretty Visitors", "length": "3:40" },
      { "title": "The Jeweller's Hands", "length": "5:42" }
    ]
  }
  ```

  And you would like to display only songs that shorter than '3:30' in length. Then your html code would be something like this:

  ```html
  <e-json
    data-src="/../album/Humbug/songs"
    data-response-name="albumResponse"
    data-actions-on-response="
      mapObjToElm('${albumResponse.body}', '#album-info');
    ">

    <template id="album-info" data-object-name="album">

      <div data-text="Title: ${album.title}"></div>
      <div data-text="Artist: ${album.artist}"></div>

      <div><b>Songs that shorter than 3:30:</b></div>
      <template is="e-for-each" data-list-to-iterate="${album.songs}" data-item-name="song">

        <template is="e-if"
          data-condition-to-display="${(song.length.split(':')[0] * 60 + song.length.split(':')[1] * 1) <= 210}"
        >
          <div class="song-box">
            <div data-text="No. ${song.index}/${album.songs.length}"></div>
            <div data-text="Title: ${song.title}"></div>
            <div data-text="Length: ${song.length}"></div>
          </div>
        </template>
      
      </template>

    </template>
  </e-json>
  ```

  This element has only one attribute `data-condition-to-display` that specifies a condition whether inner content of the template has to be displayed.

  When you open a browser, you will see:

  ```html
  <e-json
    data-src="/../album/Humbug/songs"
    data-response-name="albumResponse"
    data-actions-on-response="
      mapObjToElm('${albumResponse.body}', '#album-info');
    ">

    <div>Title: Humbug</div>
    <div>Artist: Arctic Monkeys</div>

    <div><b>Songs that shorter than 3:30:</b></div>
    <div class="song-box">
      <div>No. 1/10</div>
      <div>Title: My Propeller</div>
      <div>Length: 3:27</div>
    </div>
    <div class="song-box">
      <div>No. 3/10</div>
      <div>Title: Dangerous Animals</div>
      <div>Length: 3:30</div>
    </div>
    <div class="song-box">
      <div>No. 7/10</div>
      <div>Title: Cornerstone</div>
      <div>Length: 3:18</div>
    </div>

  </e-json>
  ```

</details>

<details>
  <summary><b>E-FORM</b></summary>

   Custom element `e-form` is a great solution, if you want to send data from your form in JSON format. So, let's say you have an endpoint `/artist/{name}/albums/add` with method 'POST' and expected request body is something like:

  ```json
  name = 'Arctic Monkeys'
  {
    "title": "Humbug",
    "type": "studio album",
    "releaseDate": "19 August 2009",
    "genre": ["psychedelic rock", "hard rock", "stoner rock", "desert rock"],
    "length": "39:20",
    "label": "Domino",
    "producer": "James Ford, Joshua Homme"
  }
  ```

  Then you can make this request with following html code:

  ```html
  <e-form>
    
    Title:
    <input type="text" name="title">
    
    Type:
    <input type="radio" name="type" value="studio album" checked>
    <label for="one">One</label>

    <input type="radio" name="type" value="live album" checked>
    <label for="one">One</label>

    Release date:
    <input type="date" name="releaseDate">

    Genre:
    <input type="checkbox" name="genre" value="psychedelic rock">
    <input type="checkbox" name="genre" value="hard rock">
    <input type="checkbox" name="genre" value="stoner rock">
    <input type="checkbox" name="genre" value="desert rock">

    Total length:
    <input type="time" name="totalLength">

    Producer:
    <input type="text" name="producer">

    <button
      id="send"
      data-request-url="/artist/Arctic_Monkeys/albums/add"
      data-request-method="POST"
      data-request-headers="{}"
      data-ajax-icon="#ajaxIcon"
      data-response-name="savedAlbum"
      onclick="this.form.submit(this)"
      data-actions-on-response="
        logToConsole('response: ', '${savedAlbum}');
      "
    />

    <img id="ajaxIcon" src="/../images/ajax-loader.gif"/>
    
  </e-form>
  ```

  So, like standard `form` element `e-form` can have inputs with different types, selects, radio buttons, checkboxes and textareas. Every item in `e-form` mast have `name` attribute, which will be used as a key in the request body. And `value` of every item is used as a value for corresponding name in the request body.

  This element will be rendered as a standard `form` element with attribute `data-e-form="true"`, but it will send its data as json object. You can do it by attaching events on buttons or other active elements with function: `this.form.submit(this)`, which constructs a request body by the form's items and submits it. Such approach is much better than standard `action` attribute in the `form` tag because you can attach different requests on several active elements using the same form. 

  Also you have to add other information about the request you want to make in the attributes: `data-request-url`, `data-request-method`, `data-request-headers`. You can even add attributes like `data-ajax-icon`, `data-progress-bar` and `data-upload-progress-bar` which can display progress of the request.

  Like for `e-json`, you can do [some actions on response](#suppoted-actions-on-response) with the name that you specify in `data-response-name` attribute. In this case, we just log the response from the request. 

  You can also do validation of your e-forms by attributes: `required`, `pattern`, `data-validation-error-class-for-element`, `data-validation-error-class-for-message-box`, `data-validation-bad-format-error-message` and `data-validation-min-files-number`. More details you can find in the [examples](#examples).

</details>

<details>
  <summary><b>E-LOCAL-STORAGE-VALUE and E-SESSION-STORAGE-VALUE</b></summary>

  For retrieving values from local storage you can use `e-local-storage-value` and use it in a form:

  ```html
  <e-form>
    
    <e-local-storage-value name="jwt" data-key="jwtToken"></e-local-storage-value>

    <button
      id="send"
      data-request-url="/verify"
      data-request-method="POST"
      data-request-headers="{}"
      data-ajax-icon="#ajaxIcon"
      data-response-name="response"
      onclick="this.form.submit(this)"
      data-actions-on-response="
        logToConsole('response: ', '${response}');
      "
    />

    <img id="ajaxIcon" src="/../images/ajax-loader.gif"/>
    
  </e-form>
  ```

  Element `e-local-storage-value` behaves like any input element in the `e-form`: it has attribute `name` which will be used as a key in request body, and value of the `e-local-storage-value` is a value that is stored in the local storage with the key that you specify in the `data-key` attribute.

  So, in this case `e-form` will construct following request body:

  ```json
  {
    "jwt": "some value from local storage with key 'jwtToken' (it's like localStorage.getItem('jwtToken'))" 
  }
  ```

  Element `e-session-storage-value` works in the same way as `e-local-storage-value` but with session storage:

  ```html
  <e-form>
    
    <e-local-session-value name="sessionToken" data-key="token"></e-local-storage-value>

    <button
      id="send"
      data-request-url="/verify/"
      data-request-method="POST"
      data-request-headers="{}"
      data-ajax-icon="#ajaxIcon"
      data-response-name="response"
      onclick="this.form.submit(this)"
      data-actions-on-response="
        logToConsole('response: ', '${response}');
      "
    />

    <img id="ajaxIcon" src="/../images/ajax-loader.gif"/>
    
  </e-form>
  ```

  ```json
  {
    "sessionToken": "some value from session storage with key 'token' (it's like sessionStorage.getItem('token'))" 
  }
  ```

  You can also get items from local and session storages in the attributes of any elements: `some-attr="${localStorage.itemName}"` or `some-attr="${sessionStorage.itemName}"`.

</details>

<details>
  <summary><b>E-GOOGLE-OAUTH-BUTTON</b></summary>

  You can integrate Google Sign-In into your web app just by adding one button:

  ```html
  <e-google-oauth-button
    class="customSignIn"
    data-client-id="8310979471-lvmkisk1b33fjd25pjjqe8v8fa72rq2q.apps.googleusercontent.com"
    data-redirect-url="/../google"
    data-cookiepolicy="single_host_origin"
    data-scope="profile"
    data-request-token-key="googleToken"
    data-response-name="responseWithToken"
    data-actions-on-response="
      saveToLocalStorage('jwt', '${responseWithToken.body.jwt}');
    ">

    <span id="google-icon" class="icon"></span>
    <span class="buttonText">Sign in with Google</span>

  </e-google-oauth-button>
  ```

  It will be rendered as a simple button with attribute `data-e-google-oauth-button="true"`. You can configure google oauth with custom attributes: `data-client-id`, `data-redirect-url`, `data-cookiepolicy` and `data-scope`.

  Attribute `data-request-token-key` specifies a key in the request body that you will send to your api after it's been obtained from google endpoint. So, in this case your endpoint with path `/../google`(which you specified in the `data-redirect-url`) would expect request body: `{ "googleToken": "<some token from google>" }`. And let's say your endpoint returns response with **jwt** token that's based on user data, which has been recived by "googleToken". You can use this response in attribute `data-actions-on-response`. For example, in this case we save it to local storage. The name of the response you specify in `data-response-name` like in `e-json` or `e-form`.

  Demo of `e-google-oauth-button` you can find in the [examples](#examples).

</details>

<details>
  <summary><b>E-PAGE-WITH-URL template</b></summary>

  You can define url parameters via template with attribute `is="e-page-with-url"`:

  ```html
  <body>
    <template is="e-page-with-url" data-url-pattern="/album/{title}">
      <!-- content -->
    </template>
  </body>
  ```

  Or for example:

  ```html
  <body>
    <template is="e-page-with-url" data-url-pattern="/artists?search={query}">
      <!-- content -->
    </e-page-with-url>
  </body>
  ```

  You can get url parameters in any attributes of any elements via `urlParams` object: `some-attr="${urlParams.someValue}"`. It's important to place `e-page-with-url` in the beginning of `<body>` with all elements that use `urlParams` inside of it:

  ```html
  <body>
    <template is="e-page-with-url" data-url-pattern="/album/{title}">
      
      <div data-text="Album title: ${urlParams.title}"></div>

    </template>
  </body>
  ```

  So, for example, when you open url `http://0.0.0.0:8000/album/Humbug` in a browser, you would see:

  ```html
  <body>
      
    <div>Album title: Humbug</div>

  </body>
  ```

  Element `e-page-with-url` is a template because we have to initialize `urlParams` before we render all elements that use those parameters. 

  More details you can find in the [examples](#examples).

</details>

<details>
  <summary><b>E-TURBOLINK</b></summary>

  **EHTML** supports [turbolinks](https://github.com/turbolinks/turbolinks) via `e-turbolink`. The main difference from classic turbolinks is that `e-tubolink` does not merge `<head>` from the page it fetches. The idea behind this decision was that it would make rendered html code much cleaner(but this decision is still discussable).

  ```html
  <e-turbolink data-href="/../html/next.html" data-ajax-favicon="/../images/ajax-loader.gif">
    next page
  </e-turbolink>
  ```

  `e-turbolink` will be rendered as a simple link `<a>` with attribute `data-e-turbolink="true"`. When you click on a `e-turbolink`, it fetches a page which is served with the path that you specify in the attribute `data-href`, extracts `<body>` from there and swaps it with current `<body>`. Also it saves history, so you can use Reload, Back and Forward buttons in the browser.

  As `e-turbolink` does not merge `<head>`, you have to design it in a way so it would work for every page that you want to "turbolink" there.

  Also you can specify ajax favicon via attribute `data-ajax-favicon`, but it would probably not work in Chrome, as it does not support `gif` format in the favicons.

  But you can use progress bars instead via `data-with-progress-bar`:

  ```html
  <e-turbolink data-href="/../html/next.html" data-with-progress-bar="progress-bar">
    next page
  </e-turbolink>
  ```
  where value of this attribute is a css class:

  ```css
  .progress-bar {
    width: 100%;
  }
  ```

  You can also specify a place for the progress bar via attribute `data-progress-bar-place`, by default it's `body`.

  Demo of `e-turbolink` you can find in the [examples](#examples).

</details>

<details>
  <summary><b>E-SELECT</b></summary>

  Standard `select` can be better. For example, it would be great if we could set a value to it, so it would be selected automatically on render. `e-select` does such thing:

  ```html
  <e-select
    name="color" 
    value="green">
    <option value="red" name="color">Red</option>
    <option value="green" name="color">Green</option>
    <option value="blue" name="color">Blue</option>
  </e-select>
  ```

  It will be rendered as a simple select with attribute `data-e-select="true"` with automatically selected value that you specify in attribute `value`.

  Demo of `e-select` you can find in the [examples](#examples).

</details>

# Supported actions on response



# Examples
