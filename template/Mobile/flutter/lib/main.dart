import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';

Future<void> main() async {
  try {
    await dotenv.load(fileName: ".env");
    runApp(const MyApp());
  } catch (e) {
    print("Error loading .env file: $e");
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Quotes App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const QuotesScreen(),
    );
  }
}

class QuotesScreen extends StatefulWidget {
  const QuotesScreen({super.key});

  @override
  State<QuotesScreen> createState() => _QuotesScreenState();
}

class _QuotesScreenState extends State<QuotesScreen> {
  String _quote = "Fetching quote...";
  String _author = "";

  @override
  void initState() {
    super.initState();
    fetchQuote();
  }

  Future<void> fetchQuote() async {
    final response = await http.get(
      Uri.parse('https://api.api-ninjas.com/v1/quotes?category=happiness'),
      headers: {
        'X-Api-Key': dotenv.env['API_KEY']!,
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> quotes = json.decode(response.body);
      if (quotes.isNotEmpty) {
        setState(() {
          _quote = quotes[0]['quote'];
          _author = quotes[0]['author'];
        });
      } else {
        setState(() {
          _quote = "No quotes found.";
        });
      }
    } else {
      setState(() {
        _quote = "Failed to fetch quote.";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Quotes'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                '"$_quote"',
                style: const TextStyle(fontSize: 20, fontStyle: FontStyle.italic),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Text(
                '- $_author',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: fetchQuote,
        tooltip: 'Fetch New Quote',
        child: const Icon(Icons.refresh),
      ),
    );
  }
}
