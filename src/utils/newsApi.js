import axios from 'axios';

// Try NewsAPI.org first with your key
const API_KEY = '25fe6286b2ca4d578dca91c5ea60ab43';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchCityNews = async (city) => {
  try {
    // Try NewsAPI.org
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: city,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
        apiKey: API_KEY,
      },
    });

    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description || 'No description available',
      url: article.url,
      image: article.urlToImage || 'https://via.placeholder.com/400x250?text=No+Image',
      publishedAt: article.publishedAt,
      source: article.source.name,
    }));
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);
    // Fallback to sample data
    return getSampleNews(city);
  }
};

// Fallback sample data when API fails or no key provided
export const getSampleNews = (city) => {
  return [
    {
      title: `${city} Announces Major Infrastructure Upgrades`,
      description: `The city council has approved a massive infrastructure project aimed at improving public transportation and road networks across ${city}.`,
      url: `https://example.com/${city.replace(/\s+/g, '-').toLowerCase()}/article1`,
      image: 'https://picsum.photos/400/250?random=1',
      publishedAt: new Date().toISOString(),
      source: 'City News',
    },
    {
      title: `Tech Giants Expand Operations in ${city}`,
      description: `Several major technology companies have announced plans to open new offices in ${city}, creating thousands of jobs.`,
      url: `https://example.com/${city.replace(/\s+/g, '-').toLowerCase()}/article2`,
      image: 'https://picsum.photos/400/250?random=2',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: 'Tech Daily',
    },
    {
      title: `${city}'s Tourism Industry Shows Record Growth`,
      description: `The tourism sector in ${city} has experienced unprecedented growth this quarter, with visitor numbers reaching all-time highs.`,
      url: `https://example.com/${city.replace(/\s+/g, '-').toLowerCase()}/article3`,
      image: 'https://picsum.photos/400/250?random=3',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: 'Travel Weekly',
    },
    {
      title: `New Green Initiatives Launched in ${city}`,
      description: `The city has unveiled ambitious plans to become carbon neutral by 2030, including new renewable energy projects.`,
      url: `https://example.com/${city.replace(/\s+/g, '-').toLowerCase()}/article4`,
      image: 'https://picsum.photos/400/250?random=4',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: 'Environment Today',
    },
    {
      title: `${city} Hosts International Cultural Festival`,
      description: `A week-long celebration of arts and culture brings together performers and artists from around the world.`,
      url: `https://example.com/${city.replace(/\s+/g, '-').toLowerCase()}/article5`,
      image: 'https://picsum.photos/400/250?random=5',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: 'Culture Magazine',
    },
    {
      title: `${city} Public Schools Announce New STEM Programs`,
      description: `Educational institutions in ${city} are launching innovative science and technology programs to prepare students for future careers.`,
      url: `https://example.com/${city.replace(/\s+/g, '-').toLowerCase()}/article6`,
      image: 'https://picsum.photos/400/250?random=6',
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      source: 'Education News',
    },
    {
      title: `${city} Housing Market Sees Continued Growth`,
      description: `Real estate experts report strong demand and rising property values across ${city} neighborhoods.`,
      url: `https://example.com/${city.replace(/\s+/g, '-').toLowerCase()}/article7`,
      image: 'https://picsum.photos/400/250?random=7',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      source: 'Property Times',
    },
    {
      title: `${city} Launches New Public Health Initiative`,
      description: `City officials announce comprehensive wellness program aimed at improving community health outcomes.`,
      url: `https://example.com/${city.replace(/\s+/g, '-').toLowerCase()}/article8`,
      image: 'https://picsum.photos/400/250?random=8',
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      source: 'Health Today',
    },
  ];
};
