const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Secret key for JWT
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// Sample admin credentials (in production, use a database)
const adminCredentials = {
    username: 'admin',
    password: '$2a$10$X7z3bZ2qQK1qQK1qQK1qQK1qQK1qQK1qQK1qQK1qQK1qQK1qQK1qQK' // hashed 'admin123'
};

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (username === adminCredentials.username) {
        const validPassword = await bcrypt.compare(password, adminCredentials.password);
        
        if (validPassword) {
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Protected route middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Protected admin endpoint
app.get('/api/admin/data', authenticateToken, (req, res) => {
    res.json({ success: true, message: 'Protected admin data' });
});

// Chat response endpoint
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    
    // Sample responses (in production, use a more sophisticated AI/ML model)
    const responses = {
        'hello': 'Hello! I\'m your career guidance assistant specializing in Computer Science and Engineering. How can I help you today?',
        'java': 'Java Career Path:\n1. Core Java Developer\n2. Spring Framework Developer\n3. Android Developer\n4. Enterprise Application Developer\n\nKey Skills:\n- Object-Oriented Programming\n- Spring Boot\n- Hibernate\n- RESTful APIs\n- Design Patterns\n\nAverage Salary Range: $70,000 - $120,000',
        'python': 'Python Career Opportunities:\n1. Data Scientist\n2. Machine Learning Engineer\n3. Backend Developer\n4. Automation Engineer\n\nKey Skills:\n- NumPy/Pandas\n- Django/Flask\n- TensorFlow/PyTorch\n- Web Scraping\n- Data Analysis\n\nAverage Salary Range: $80,000 - $130,000',
        'c++': 'C++ Career Paths:\n1. Game Developer\n2. System Programmer\n3. Embedded Systems Engineer\n4. High-Frequency Trading Developer\n\nKey Skills:\n- STL\n- Memory Management\n- Multi-threading\n- Performance Optimization\n- Game Development\n\nAverage Salary Range: $75,000 - $125,000',
        'dsa': 'Data Structures & Algorithms:\n1. Software Engineer\n2. Competitive Programmer\n3. Algorithm Engineer\n4. Research Scientist\n\nKey Topics:\n- Time & Space Complexity\n- Sorting & Searching\n- Dynamic Programming\n- Graph Algorithms\n- Tree Structures\n\nResources:\n- LeetCode\n- Codeforces\n- GeeksforGeeks\n- HackerRank',
        'problem solving': 'Problem Solving Skills:\n1. Competitive Programming\n2. Technical Interviews\n3. Real-world Applications\n\nKey Areas:\n- Algorithm Design\n- Pattern Recognition\n- Optimization\n- Debugging\n\nPractice Platforms:\n- CodeChef\n- TopCoder\n- AtCoder\n- Project Euler',
        'web development': 'Web Development Paths:\n1. Frontend Developer\n2. Backend Developer\n3. Full Stack Developer\n4. Web Security Specialist\n\nKey Technologies:\n- HTML/CSS/JavaScript\n- React/Angular/Vue\n- Node.js/PHP/Python\n- Databases (SQL/NoSQL)\n- REST/GraphQL\n\nAverage Salary Range: $65,000 - $110,000',
        'machine learning': 'Machine Learning Careers:\n1. ML Engineer\n2. Data Scientist\n3. AI Researcher\n4. Computer Vision Engineer\n\nKey Skills:\n- Python\n- TensorFlow/PyTorch\n- Statistics\n- Deep Learning\n- Natural Language Processing\n\nAverage Salary Range: $90,000 - $150,000',
        'cybersecurity': 'Cybersecurity Careers:\n1. Security Analyst\n2. Ethical Hacker\n3. Security Architect\n4. Incident Responder\n\nKey Skills:\n- Network Security\n- Cryptography\n- Penetration Testing\n- Security Tools\n- Risk Assessment\n\nAverage Salary Range: $80,000 - $140,000',
        'cloud computing': 'Cloud Computing Careers:\n1. Cloud Architect\n2. DevOps Engineer\n3. Cloud Security Specialist\n4. Solutions Architect\n\nKey Skills:\n- AWS/Azure/GCP\n- Docker/Kubernetes\n- CI/CD\n- Infrastructure as Code\n- Cloud Security\n\nAverage Salary Range: $90,000 - $160,000',
        'education': 'CSE Educational Paths:\n1. Bachelor\'s in Computer Science\n2. Master\'s in Specialized Areas\n3. Online Certifications\n4. Bootcamps\n\nRecommended Courses:\n- Data Structures & Algorithms\n- Operating Systems\n- Computer Networks\n- Database Systems\n- Software Engineering',
        'job market': 'CSE Job Market Trends:\n1. High Demand for:\n   - AI/ML Engineers\n   - Cloud Architects\n   - Cybersecurity Experts\n   - Full Stack Developers\n2. Emerging Fields:\n   - Quantum Computing\n   - Blockchain\n   - Edge Computing\n   - AR/VR Development',
        'skills': 'Essential CSE Skills:\n1. Technical Skills:\n   - Programming Languages\n   - Data Structures\n   - System Design\n   - Version Control\n2. Soft Skills:\n   - Problem Solving\n   - Communication\n   - Team Collaboration\n   - Continuous Learning',
        'default': 'I understand you\'re interested in Computer Science careers. Could you please specify what aspect you\'d like to know more about? For example:\n- Programming Languages (Java, Python, C++)\n- Data Structures & Algorithms\n- Web Development\n- Machine Learning\n- Cybersecurity\n- Cloud Computing\n- Problem Solving\n- Education Paths\n- Job Market Trends\n- Required Skills'
    };

    const lowerMessage = message.toLowerCase();
    let response = responses.default;

    for (const [key, value] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            response = value;
            break;
        }
    }

    res.json({ success: true, response });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 