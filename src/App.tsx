/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
// Import placeholders for other pages we will create shortly
import WebGenerator from './pages/WebGenerator';
import ImageGenerator from './pages/ImageGenerator';
import VideoGenerator from './pages/VideoGenerator';
import BusinessGenerator from './pages/BusinessGenerator';
import MyPrompts from './pages/MyPrompts';
import History from './pages/History';
import Favorites from './pages/Favorites';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import Help from './pages/Help';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="generate/web" element={<WebGenerator />} />
          <Route path="generate/image" element={<ImageGenerator />} />
          <Route path="generate/video" element={<VideoGenerator />} />
          <Route path="generate/business" element={<BusinessGenerator />} />
          <Route path="my-prompts" element={<MyPrompts />} />
          <Route path="history" element={<History />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="templates" element={<Templates />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
