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
> react-native run-ios --scheme="NoteApp_Dev | NoteApp_Staging | NoteApp"
```

##### Run Android
```
> react-native run-android --variant="devDebug | stagingDebug | prodDebug"
```


### Features
- Organized files & folders
- Do RESTful API with a single action
- Can do both promise & redux when calling API (without redux-saga or redux-thunk)
- Automatic show loading, error, or success without overload the screen
- Automatic switch between login and app screen
- Automatic handle session expired
- Mock server, the response is in the bundle, no need NoteServer or internet connection
- Multiple environment
  - Dev : Use mock server
  - Staging: Use NoteServer
  - Production: Use dummy external url
- Unit testing with mock server
