# Thingyan Alwan

A beautiful web application dedicated to the Myanmar New Year Water Festival, Thingyan. This platform allows users to explore traditions, listen to festive songs, and share their precious Thingyan memories with others.

## Features

- **Traditions & Culture:** Learn about the rich history and traditions of Thingyan, including almanacs and food guides.
- **Thingyan Playlist:** An integrated music player to enjoy classic and modern Thingyan songs.
- **Memory Sharing:** Upload and share your favorite photos and memories from past festivals.
- **User Authentication:** Secure sign-up and login powered by Supabase.
- **Modern UI:** A stunning, responsive interface built with React, Tailwind CSS, and Framer Motion.

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend/BaaS:** Supabase (Authentication, Database, Storage)
- **Routing:** React Router DOM

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Supabase project with configured storage buckets (`memory-images` and `thangyan-songs`) and appropriate Row Level Security (RLS) policies.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Heinkhantphyoe/thingyan-alwan.git
   ```

2. Navigate into the project directory:
   ```bash
   cd thingyan-alwan
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
