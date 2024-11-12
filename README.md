# Article Snap

Welcome to Article Snap! This is a web application that fetches the latest news articles, categorizes them, and provides a summarized version using an AI-powered summarizer. Built with React and Axios, it utilizes APIs to fetch news and generate summaries dynamically.

## Web UI

![Web UI](Images/Screenshot%202024-11-12%20142759.png)
![Web UI](Images/Screenshot%202024-11-12%20142840.png)

## Features

- Fetches news articles from various categories.
- Summarizes articles using an AI summarization API.
- Displays articles in a responsive, easy-to-navigate interface.

## Technologies Used

- React: Used for building the user interface.
- Axios: For making API requests.
- TailwindCSS: For styling the application.
- NewsData.io API: For fetching the latest news articles.
- Article Extractor & Summarizer API (via RapidAPI): For summarizing articles.

## Installation

1. Clone the repository:

bash
git clone https://github.com/akellasrinivas/ArticleSnap.git


2. Install the dependencies:

bash
npm install


3.Create a .env file in the root directory and add your API keys:

bash
REACT_APP_NEWS_API_KEY=your_news_api_key_here
REACT_APP_SUMMARY_API_KEY=your_summary_api_key_here


4.To get the News API Key:

- Go to NewsData.io.
- Sign up or log in.
- Navigate to the API Key page and generate your API key.
- Copy and paste the key into your .env file under REACT_APP_NEWS_API_KEY.

5.To get the RapidAPI Key (Article Extractor & Summarizer):

- Go to RapidAPI Article Extractor & Summarizer.
- Sign up or log in.
- Subscribe to the API and get your API key.
- Copy and paste the key into your .env file under REACT_APP_SUMMARY_API_KEY.


6. Start the application:

bash
npm run dev



7. Open your web browser and visit http://localhost:5000 to access the Application.


## Authors
- Dadvaiah Pavan

## Contribution

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to create an issue or submit a pull request.



## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any inquiries or further information, please contact [Srinivas Akella] via email at [akellasrinivas322@gmail.com].
