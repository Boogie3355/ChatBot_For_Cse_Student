document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    const careerResponses = {
        'hello': 'Hello! I\'m your career guidance assistant specializing in Computer Science and Engineering. How can I help you today?',
        
        'java': 'Java is a versatile, object-oriented programming language used for enterprise applications, Android development, and web services. Key areas include Spring Framework, Hibernate, and Microservices architecture. Career paths range from $70,000 to $150,000+ with roles in backend development, Android apps, and enterprise solutions.',
        
        'python': 'Python is a powerful, easy-to-learn language popular in data science, machine learning, and web development. It excels in automation, AI, and scientific computing with libraries like NumPy, Pandas, and TensorFlow. Career opportunities span from $80,000 to $160,000+ in data science, AI, and backend development.',
        
        'c++': 'C++ is a high-performance language ideal for system programming, game development, and embedded systems. It offers direct hardware control and is used in performance-critical applications like game engines and trading systems. Career paths range from $75,000 to $180,000+ in gaming, finance, and system development.',
        
        'dsa': 'Data Structures and Algorithms form the foundation of efficient programming and problem-solving. Essential for technical interviews and system design, covering topics like sorting, searching, and graph algorithms. Career paths range from $80,000 to $150,000+ in software engineering and research.',
        
        'web development': 'Web development involves creating websites and web applications using HTML, CSS, JavaScript, and backend technologies. It includes frontend, backend, and full-stack development with modern frameworks like React and Node.js. Career paths range from $65,000 to $160,000+ in various web development roles.',
        
        'database': 'Database systems manage and organize data efficiently using SQL and NoSQL technologies. Key areas include database design, optimization, and management for applications and analytics. Career paths range from $70,000 to $150,000+ in database administration and development.',
        
        'operating systems': 'Operating systems manage computer hardware and software resources, providing essential services for applications. Key areas include process management, memory management, and file systems. Career paths range from $80,000 to $160,000+ in system programming and embedded development.',
        
        'networks': 'Computer networks connect devices to share resources and information using protocols like TCP/IP. Key areas include network design, security, and cloud networking. Career paths range from $70,000 to $150,000+ in network engineering and administration.',
        
        'machine learning': 'Machine learning enables computers to learn from data and make predictions using algorithms and models. Key areas include deep learning, natural language processing, and computer vision. Career paths range from $90,000 to $180,000+ in AI research and development.',
        
        'cybersecurity': 'Cybersecurity protects systems and networks from digital attacks and unauthorized access. Key areas include network security, cryptography, and ethical hacking. Career paths range from $80,000 to $160,000+ in security analysis and architecture.',
        
        'cloud computing': 'Cloud computing delivers computing services over the internet using platforms like AWS and Azure. Key areas include cloud architecture, DevOps, and serverless computing. Career paths range from $90,000 to $170,000+ in cloud engineering and architecture.',
        
        'software engineering': 'Software engineering focuses on designing, developing, and maintaining software systems. Key areas include software architecture, testing, and project management. Career paths range from $75,000 to $160,000+ in various software development roles.',
        
        'mobile development': 'Mobile development creates applications for smartphones and tablets using platforms like Android and iOS. Key areas include native and cross-platform development with frameworks like Flutter. Career paths range from $70,000 to $150,000+ in mobile app development.',
        
        'game development': 'Game development involves creating interactive games using engines like Unity and Unreal. Key areas include graphics programming, physics simulation, and game design. Career paths range from $65,000 to $140,000+ in game programming and design.',

        'artificial intelligence': 'AI combines computer science and robust datasets to enable problem-solving. Key areas include machine learning, neural networks, and natural language processing. Career paths range from $90,000 to $200,000+ in AI research, development, and implementation.',

        'blockchain': 'Blockchain technology enables secure, decentralized transactions and data storage. Key areas include smart contracts, cryptocurrency, and distributed systems. Career paths range from $85,000 to $180,000+ in blockchain development and architecture.',

        'data science': 'Data science combines statistics, programming, and domain knowledge to extract insights from data. Key areas include data analysis, visualization, and predictive modeling. Career paths range from $85,000 to $170,000+ in data analysis and research.',

        'devops': 'DevOps combines software development and IT operations to improve collaboration and automation. Key areas include CI/CD, containerization, and infrastructure as code. Career paths range from $80,000 to $160,000+ in DevOps engineering and architecture.',

        'embedded systems': 'Embedded systems combine hardware and software for specific functions in larger systems. Key areas include microcontroller programming, real-time systems, and IoT. Career paths range from $75,000 to $150,000+ in embedded systems development.',

        'computer graphics': 'Computer graphics involves creating and manipulating visual content using computers. Key areas include 3D modeling, animation, and visual effects. Career paths range from $70,000 to $150,000+ in graphics programming and design.',

        'robotics': 'Robotics combines mechanical engineering, electronics, and computer science to create autonomous systems. Key areas include control systems, computer vision, and machine learning. Career paths range from $80,000 to $160,000+ in robotics engineering and research.',

        'quantum computing': 'Quantum computing uses quantum mechanics to process information. Key areas include quantum algorithms, error correction, and quantum software development. Career paths range from $100,000 to $200,000+ in quantum computing research and development.',

        'bioinformatics': 'Bioinformatics combines biology and computer science to analyze biological data. Key areas include genomic analysis, protein structure prediction, and drug discovery. Career paths range from $75,000 to $150,000+ in bioinformatics research and development.',

        'default': 'I understand you\'re interested in Computer Science careers. Could you please specify what aspect you\'d like to know more about? For example:\n- Programming Languages (Java, Python, C++)\n- Data Structures & Algorithms\n- Web Development\n- Machine Learning\n- Cybersecurity\n- Cloud Computing\n- Database Systems\n- Operating Systems\n- Computer Networks\n- Software Engineering\n- Artificial Intelligence\n- Blockchain\n- Data Science\n- DevOps\n- Embedded Systems\n- Computer Graphics\n- Robotics\n- Quantum Computing\n- Bioinformatics'
    };

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user' : 'bot');
        
        const messageText = document.createElement('p');
        messageDiv.appendChild(messageText);
        
        chatMessages.appendChild(messageDiv);
        
        // Add typing animation for bot messages
        if (!isUser) {
            let i = 0;
            const typeWriter = () => {
                if (i < message.length) {
                    messageText.textContent += message.charAt(i);
                    i++;
                    setTimeout(typeWriter, 10); // Adjust speed here (lower = faster)
                }
            };
            typeWriter();
        } else {
            messageText.textContent = message;
        }
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(careerResponses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return careerResponses.default;
    }

    function handleUserInput() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            // Simulate bot thinking
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response);
            }, 1000);
        }
    }

    sendButton.addEventListener('click', handleUserInput);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    document.querySelectorAll('.resource-card').forEach(card => {
        card.addEventListener('click', () => {
            const topic = card.querySelector('h4').textContent.toLowerCase();
            const response = getBotResponse(topic);
            addMessage(response);
        });
    });

    // Content for each button
    const careerOptions = {
        'education-paths': "Education Paths: For a career in Computer Science, you can pursue a Bachelor's degree (B.Tech, B.Sc), followed by a Master's (M.Tech, M.Sc, MCA), and even PhD for research roles. Certifications and online courses (Coursera, edX, Udemy) also add value.",
        'job-market': "Job Market: The job market for Computer Science professionals is strong, with demand in software development, data science, AI, cybersecurity, and more. Top employers include tech giants, startups, and government organizations.",
        'career-growth': "Tips for Career Advancement: Keep learning new technologies, build a strong portfolio, network with professionals, and seek mentorship. Soft skills like communication and teamwork are also crucial for growth."
    };

    // Add click handlers for the career option buttons
    const educationBtn = document.getElementById('education-paths-btn');
    const jobMarketBtn = document.getElementById('job-market-btn');
    const careerGrowthBtn = document.getElementById('career-growth-btn');

    if (educationBtn) {
        educationBtn.addEventListener('click', () => {
            addMessage(careerOptions['education-paths']);
        });
    }
    if (jobMarketBtn) {
        jobMarketBtn.addEventListener('click', () => {
            addMessage(careerOptions['job-market']);
        });
    }
    if (careerGrowthBtn) {
        careerGrowthBtn.addEventListener('click', () => {
            addMessage(careerOptions['career-growth']);
        });
    }

    // Add functionality for "Forgot password?" link
    const forgotPasswordLink = document.querySelector('.form-txt a[href="#"]');
    if (forgotPasswordLink && forgotPasswordLink.textContent.includes('Forgot password')) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('signin-email').value.trim();
            
            if (!email) {
                alert('Please enter your email address first.');
                return;
            }
            
            // You can add Firebase password reset functionality here
            alert('Password reset link would be sent to: ' + email + '\n\nThis feature requires Firebase Authentication setup.');
            
            // For Firebase password reset, you would use:
            // import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
            // sendPasswordResetEmail(auth, email)
            //   .then(() => {
            //     alert('Password reset email sent!');
            //   })
            //   .catch((error) => {
            //     alert('Error: ' + error.message);
            //   });
        });
    }
});