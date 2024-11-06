## Introduction
This template demonstrates a simple Flutter application that fetches and displays quotes from an API. It uses the `http` package for making HTTP requests and the `flutter_dotenv` package for managing environment variables.

## Dependencies

Add the following dependencies to your `pubspec.yaml` file:

```yaml
dependencies:
    flutter:
        sdk: flutter
    http: ^0.13.3
    flutter_dotenv: ^5.0.2
```

## Environment Variables

Create a `.env` file in the root of your project and add your API key:

```
API_KEY=your_api_key_here
```

## Screenshots

<img src="https://github.com/user-attachments/assets/19be5038-c1e0-46ec-af64-d06d545dfdae" alt="Screenshot 1" width="200" />
<img src="https://github.com/user-attachments/assets/ce3367b7-5afb-4a2c-a4bb-12d0bd48ee74" alt="Screenshot 2" width="200" />


## Running the App

1. Ensure you have Flutter installed and set up.
2. Add your API key to the `.env` file.
3. Run `flutter pub get` to install dependencies.
4. Use `flutter run` to start the application.

This will launch the app, and you should see a quote displayed on the screen. Press the refresh button to fetch a new quote.
