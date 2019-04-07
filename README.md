# NoteApp-RN

A sample app with RESTful API for training and development purpose.
Use [NoteServer](https://github.com/bungferdly/NoteServer) as the backend.

### Getting Started

```
> git clone https://github.com/bungferdly/NoteApp-RN.git
> cd NoteApp-RN
> yarn
```

##### Run iOS

```
> react-native run-ios --scheme="NoteApp | NoteApp_SIT | | NoteApp_UAT | NoteApp_PROD"
```

##### Run Android

```
> react-native run-android --variant="devDebug | sitDebug | uatDebug | prodDebug"
```

### Features

- Organized files & folders
- Do RESTful API with a single action
- Can do both promise & redux when calling API (without redux-saga or redux-thunk)
- Automatic show loading, error, or success without overload the screen
- Automatic handle session expired
- Mock server for fast development, **NO NEED INTERNET CONNECTION ^^**
- Multiple environment
  - DEV : Use mock server
  - SIT : Use NoteServer
  - UAT : Use NoteServer
  - PROD : Use dummy external url
- Unit testing with mock server
- Dynamic styles & layout
- Theme
