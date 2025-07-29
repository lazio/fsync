# Weekly Parents' Meeting

A mobile-first web app that guides couples through structured weekly family meetings with a playful, friction-free approach.

## Features

- **Ice-Breaker**: Start each meeting with a random conversation prompt
- **Check-in**: Share moods and feelings with your partner
- **Topic Discussion**: Cover important life topics in customizable order
- **Wrap-up**: Capture key takeaways and express gratitude
- **Customizable**: Choose which topics to include and whether to shuffle them

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OR Docker and Docker Compose

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/lazio/fsync.git
cd fsync
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up -d
```

2. Access the app at http://localhost:3000

3. To stop the container:
```bash
docker-compose down
```

### Docker Commands

Build the image:
```bash
docker build -t weekly-parents-meeting .
```

Run the container:
```bash
docker run -d -p 3000:80 --name wpm weekly-parents-meeting
```

View logs:
```bash
docker logs wpm
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **State Management**: Zustand
- **Styling**: SCSS + shadcn components
- **Deployment**: GitHub Pages / Docker

## Topics

### Default Topics
- Home & Household
- Child & Family
- Finances & Planning
- Relationship & Personal Growth

### Optional Topics
- Education & Learning
- Friends & Social Connections
- Culture & Entertainment
- Travel & Adventures
- Home Projects & DIY
- Safety & Security
- Celebrations & Milestones
- Family Values & Traditions
- Career & Professional Development
- Creative Projects

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.