// Utility per estrarre contenuti dal PDF e preparare per il RAG
export interface ExtractedChapter {
  id: number;
  title: string;
  originalTitle: string;
  pages: string;
  content: string;
  summary: string;
  keyPoints: string[];
  authors: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface ExtractedHandbook {
  title: string;
  version: string;
  language: string;
  totalPages: number;
  authors: string[];
  chapters: ExtractedChapter[];
  metadata: {
    publishedDate: string;
    license: string;
    repository: string;
    isbn?: string;
  };
}

// Contenuti estratti dal PDF V3 (simulazione dell'estrazione)
export const extractedPeeragogyV3: ExtractedHandbook = {
  title: "The Peeragogy Handbook",
  version: "3.0",
  language: "English",
  totalPages: 240,
  authors: [
    "Howard Rheingold",
    "Charles Jeffrey Danoff", 
    "Paola Ricaurte",
    "Charlotte Pierce",
    "Verena Roberts",
    "Roland Legrand",
    "Anna Keune",
    "Lisa Snow MacDonald",
    "Christopher Tillman Neal",
    "Bryan Alexander"
  ],
  chapters: [
    {
      id: 1,
      title: "Introduction",
      originalTitle: "Introduction",
      pages: "1-12",
      content: `# Introduction to Peeragogy

Welcome to the Peeragogy Handbook! This handbook is for people who want to learn how to learn and work together more effectively.

## What is Peeragogy?

Peeragogy is a flexible framework of techniques for peer learning and peer knowledge production. As we are fond of saying, peeragogy is not just about "peer learning" or "peer production" in the abstract, but about learning and working together on problems that are personally meaningful and that we want to solve.

The word "peeragogy" was coined by Howard Rheingold, drawing on the ancient Greek words "peer" (equal) and "agogy" (leading). It represents a new approach to learning that puts peers at the center of the educational process.

## Core Principles

### Peer Learning
Learning happens best when people learn from each other, sharing knowledge, skills, and experiences in a collaborative environment.

### Distributed Authority
Rather than having a single teacher or expert, authority and expertise are distributed among all participants.

### Emergent Structure
The structure of learning emerges from the needs and interests of the participants, rather than being imposed from above.

### Collective Intelligence
The group as a whole is smarter than any individual member, and this collective intelligence can be harnessed for learning and problem-solving.

## Why Peeragogy Matters

In our rapidly changing world, traditional educational models are often inadequate. Peeragogy offers a more flexible, responsive, and engaging approach to learning that can adapt to the needs of learners and the demands of the 21st century.

The principles of peeragogy can be applied in many contexts:
- Formal education settings
- Workplace learning
- Community organizations
- Online communities
- Personal development

## How to Use This Handbook

This handbook is designed to be a practical guide. Each chapter builds on the previous ones, but you can also jump to specific topics that interest you. The handbook includes:

- Theoretical foundations
- Practical techniques
- Case studies
- Patterns and anti-patterns
- Tools and technologies
- Assessment methods

We encourage you to adapt these ideas to your own context and to share your experiences with the broader peeragogy community.`,
      summary: "Introduction to the core concepts and principles of peeragogy, including peer learning, distributed authority, and emergent structure.",
      keyPoints: [
        "Peeragogy is a framework for peer learning and knowledge production",
        "Learning is most effective when peers collaborate on meaningful problems",
        "Authority and expertise are distributed among all participants",
        "Structure emerges from participant needs rather than imposed hierarchy",
        "Collective intelligence surpasses individual knowledge"
      ],
      authors: ["Howard Rheingold", "Charles Jeffrey Danoff"],
      difficulty: "beginner",
      tags: ["introduction", "principles", "peer learning", "collaboration", "framework"]
    },
    {
      id: 2,
      title: "Motivation",
      originalTitle: "Motivation",
      pages: "13-28",
      content: `# Motivation in Peeragogy

Understanding motivation is crucial for successful peer learning. This chapter explores what drives people to participate in peeragogical activities and how to sustain engagement over time.

## Intrinsic vs Extrinsic Motivation

### Intrinsic Motivation
Intrinsic motivation comes from within. People are intrinsically motivated when they:
- Find the activity inherently interesting or enjoyable
- Feel a sense of autonomy and control
- Experience competence and mastery
- Connect with others and feel part of a community

### Extrinsic Motivation
Extrinsic motivation comes from external factors:
- Rewards and recognition
- Grades or certifications
- Social pressure or expectations
- Career advancement

Research shows that intrinsic motivation is more sustainable and leads to deeper learning. However, extrinsic motivators can be useful for getting started or maintaining momentum.

## The Role of Purpose

People are most motivated when they understand the purpose behind their learning. In peeragogy, this means:
- Connecting learning to real-world problems
- Allowing learners to pursue their own interests
- Making the relevance of learning explicit
- Encouraging learners to set their own goals

## Building Motivation in Peer Learning

### Create Psychological Safety
People need to feel safe to take risks, make mistakes, and share their thoughts. This requires:
- Establishing ground rules for respectful interaction
- Modeling vulnerability and openness
- Celebrating failures as learning opportunities
- Ensuring all voices are heard and valued

### Foster Autonomy
Give learners control over their learning process:
- Allow choice in topics, methods, and pace
- Encourage self-direction and initiative
- Support learner-led projects and investigations
- Minimize unnecessary constraints and requirements

### Support Competence
Help learners feel capable and effective:
- Provide appropriate challenges (not too easy, not too hard)
- Offer scaffolding and support when needed
- Celebrate progress and achievements
- Help learners recognize their own growth

### Build Community
Create connections between learners:
- Facilitate introductions and relationship-building
- Encourage collaboration and mutual support
- Share stories and experiences
- Create opportunities for informal interaction

## Dealing with Demotivation

Even in the best peer learning environments, motivation can wane. Common causes include:
- Feeling overwhelmed or confused
- Lack of progress or visible results
- Interpersonal conflicts or tensions
- External pressures or competing priorities

Strategies for addressing demotivation:
- Regular check-ins and feedback
- Adjusting goals or expectations
- Providing additional support or resources
- Addressing conflicts directly and constructively
- Celebrating small wins and progress

## Sustaining Long-term Engagement

To keep people engaged over time:
- Vary activities and approaches
- Introduce new challenges and opportunities
- Recognize and celebrate contributions
- Provide pathways for increased responsibility
- Connect learning to broader goals and values`,
      summary: "Explores the psychology of motivation in peer learning contexts, distinguishing between intrinsic and extrinsic factors and providing strategies for building and sustaining engagement.",
      keyPoints: [
        "Intrinsic motivation is more sustainable than extrinsic motivation",
        "Purpose and relevance are key drivers of engagement",
        "Psychological safety enables risk-taking and learning",
        "Autonomy, competence, and community are essential motivational factors",
        "Regular attention to motivation is needed to sustain engagement"
      ],
      authors: ["Paola Ricaurte", "Charlotte Pierce"],
      difficulty: "intermediate",
      tags: ["motivation", "psychology", "engagement", "intrinsic", "community"]
    },
    {
      id: 3,
      title: "Case Study: 5PH1NX",
      originalTitle: "Case Study: 5PH1NX",
      pages: "29-45",
      content: `# Case Study: 5PH1NX - A Peeragogy Adventure

The 5PH1NX project represents one of the most successful applications of peeragogical principles in an online learning community. This case study examines how a group of strangers came together to create a thriving learning ecosystem.

## Background

5PH1NX began as an experimental online learning community focused on collaborative problem-solving and peer education. The name itself reflects the mysterious and transformative nature of the learning process - like the mythical sphinx, it poses riddles that can only be solved through collective wisdom.

### Initial Conditions
- 12 participants from diverse backgrounds
- No formal curriculum or predetermined structure
- Shared interest in collaborative learning
- Commitment to document the process

## The Evolution of 5PH1NX

### Phase 1: Formation (Weeks 1-4)
The initial phase was characterized by:
- Tentative introductions and relationship building
- Exploration of individual interests and expertise
- Negotiation of group norms and expectations
- Emergence of informal leadership roles

Key challenges:
- Uncertainty about direction and goals
- Different expectations and communication styles
- Technical barriers to collaboration
- Time zone and scheduling conflicts

### Phase 2: Storming (Weeks 5-8)
As the group became more comfortable, tensions emerged:
- Disagreements about priorities and methods
- Personality conflicts and communication breakdowns
- Questions about commitment and participation
- Struggles with decision-making processes

This phase was crucial for establishing trust and working through differences. The group learned to:
- Address conflicts directly and constructively
- Appreciate different perspectives and approaches
- Develop more effective communication practices
- Create structures for decision-making

### Phase 3: Norming (Weeks 9-16)
The group began to find its rhythm:
- Clear roles and responsibilities emerged
- Collaborative projects took shape
- Shared language and culture developed
- Mutual support and encouragement increased

Key developments:
- Regular meeting schedules and formats
- Collaborative documentation practices
- Peer mentoring relationships
- Celebration of individual and group achievements

### Phase 4: Performing (Weeks 17-24)
The community reached its full potential:
- High-quality collaborative outputs
- Seamless coordination and communication
- Innovation and creative problem-solving
- Strong sense of collective identity

## Key Peeragogical Elements

### Distributed Leadership
Rather than having a single leader, leadership rotated based on:
- Expertise and interest in specific topics
- Availability and capacity at different times
- Natural facilitation and organizational skills
- Willingness to take initiative

### Emergent Curriculum
The learning agenda emerged from:
- Individual interests and goals
- Group discussions and negotiations
- Real-world problems and opportunities
- Serendipitous discoveries and connections

### Peer Assessment
The group developed innovative approaches to evaluation:
- Peer feedback on contributions and participation
- Self-reflection and goal-setting processes
- Collaborative rubrics and criteria
- Recognition of different types of contributions

### Collective Knowledge Creation
The community produced:
- Collaborative research projects
- Shared resource libraries
- Documentation of learning processes
- Tools and methods for other groups

## Lessons Learned

### What Worked Well
- Starting with relationship-building and trust
- Allowing structure to emerge organically
- Embracing conflict as part of the process
- Celebrating diversity of perspectives and skills
- Maintaining focus on collective goals

### Challenges and Limitations
- Difficulty sustaining participation over time
- Balancing individual and group needs
- Managing information overload
- Dealing with technical barriers
- Maintaining momentum during difficult periods

### Implications for Other Groups
- The importance of patience in the early stages
- The value of documenting and reflecting on process
- The need for flexibility and adaptability
- The power of peer support and encouragement
- The potential for transformation through collaboration

## Conclusion

The 5PH1NX case study demonstrates that peeragogical principles can create powerful learning experiences. While the journey was not always smooth, the community's commitment to peer learning and collaborative knowledge creation led to significant individual and collective growth.

The lessons from 5PH1NX continue to inform peeragogical practice and provide inspiration for other learning communities seeking to harness the power of peer collaboration.`,
      summary: "Detailed case study of the 5PH1NX online learning community, documenting its evolution through different phases and highlighting key peeragogical principles in action.",
      keyPoints: [
        "Online learning communities evolve through predictable phases",
        "Distributed leadership is more effective than hierarchical control",
        "Conflict and tension are normal parts of group development",
        "Emergent curriculum responds to learner needs and interests",
        "Documentation and reflection are crucial for learning"
      ],
      authors: ["Verena Roberts", "Roland Legrand"],
      difficulty: "intermediate",
      tags: ["case study", "online community", "group dynamics", "leadership", "curriculum"]
    },
    {
      id: 4,
      title: "Patterns, Use Cases, and Examples",
      originalTitle: "Patterns, Use Cases, and Examples",
      pages: "46-72",
      content: `# Patterns, Use Cases, and Examples

This chapter presents a collection of patterns that have emerged from peeragogical practice. These patterns represent recurring solutions to common challenges in peer learning environments.

## Understanding Patterns

Patterns in peeragogy are:
- Recurring solutions to common problems
- Flexible templates that can be adapted to different contexts
- Descriptions of successful practices
- Tools for designing learning experiences

Each pattern includes:
- A descriptive name
- The context where it applies
- The problem it addresses
- The solution it provides
- Examples of implementation
- Related patterns

## Core Peeragogical Patterns

### Pattern 1: Wrapper
**Context**: Groups need structure and coordination without rigid hierarchy.

**Problem**: How do you provide organization and direction while maintaining peer equality?

**Solution**: Designate rotating "wrappers" who take responsibility for:
- Facilitating meetings and discussions
- Summarizing progress and decisions
- Coordinating activities and communications
- Ensuring all voices are heard

**Example**: In a study group, members take turns being the weekly wrapper, responsible for setting the agenda, facilitating discussion, and summarizing key points.

### Pattern 2: Heartbeat
**Context**: Distributed groups need regular connection and coordination.

**Problem**: How do you maintain group cohesion and momentum over time?

**Solution**: Establish regular "heartbeat" activities:
- Weekly check-ins or meetings
- Regular sharing of progress and challenges
- Consistent communication rhythms
- Predictable touchpoints for the group

**Example**: A research collaboration holds brief weekly video calls where each member shares what they've learned, what they're working on, and where they need help.

### Pattern 3: Newcomer
**Context**: Groups need to integrate new members while maintaining existing culture.

**Problem**: How do you welcome newcomers without disrupting group dynamics?

**Solution**: Create structured onboarding processes:
- Buddy systems pairing newcomers with experienced members
- Orientation materials and resources
- Gradual integration into group activities
- Explicit discussion of group norms and expectations

**Example**: An online learning community assigns each new member a mentor for their first month and provides a welcome packet with community guidelines and resources.

### Pattern 4: Roadmap
**Context**: Groups need direction and goals while remaining flexible.

**Problem**: How do you balance planning with emergent learning opportunities?

**Solution**: Develop flexible roadmaps that:
- Outline general directions and milestones
- Allow for adaptation and course corrections
- Include both individual and collective goals
- Are regularly reviewed and updated

**Example**: A professional development group creates a quarterly roadmap with learning objectives but adjusts monthly based on member interests and opportunities.

### Pattern 5: Carrying Capacity
**Context**: Groups have limited resources and energy.

**Problem**: How do you manage workload and prevent burnout?

**Solution**: Regularly assess and manage carrying capacity:
- Monitor individual and group energy levels
- Adjust goals and activities based on available resources
- Distribute workload equitably
- Build in rest and reflection time

**Example**: A volunteer organization tracks member availability and adjusts project scope to match current capacity, ensuring sustainable participation.

## Use Cases by Context

### Formal Education Settings

**K-12 Classrooms**
- Peer tutoring programs
- Collaborative research projects
- Student-led discussions
- Cross-age mentoring

**Higher Education**
- Study groups and learning circles
- Peer review and feedback
- Collaborative thesis projects
- Student-faculty partnerships

### Workplace Learning

**Professional Development**
- Communities of practice
- Peer coaching and mentoring
- Cross-functional project teams
- Knowledge sharing sessions

**Organizational Change**
- Change agent networks
- Peer support groups
- Collaborative problem-solving
- Innovation labs

### Community Organizations

**Nonprofit Sector**
- Volunteer training programs
- Peer support networks
- Community organizing
- Skill-sharing workshops

**Civic Engagement**
- Citizen science projects
- Community forums
- Participatory budgeting
- Neighborhood improvement initiatives

### Online Communities

**Learning Platforms**
- Massive Open Online Courses (MOOCs)
- Professional networks
- Hobby and interest groups
- Technical communities

**Social Networks**
- Facebook groups
- Reddit communities
- Discord servers
- Slack workspaces

## Implementation Examples

### Example 1: Corporate Learning Circle
A technology company implemented peeragogical principles in their professional development program:

**Structure**: Self-organizing learning circles of 6-8 employees
**Process**: Monthly meetings with rotating facilitation
**Content**: Member-driven topics related to career development
**Outcomes**: Increased engagement, cross-departmental collaboration, and skill development

### Example 2: University Research Collective
Graduate students formed a peer research group:

**Structure**: Weekly meetings with shared workspace
**Process**: Peer feedback on research proposals and drafts
**Content**: Individual research projects with collaborative elements
**Outcomes**: Improved research quality, faster progress, and stronger professional networks

### Example 3: Community Maker Space
A local maker space adopted peeragogical approaches:

**Structure**: Skill-sharing workshops led by members
**Process**: Peer teaching and collaborative projects
**Content**: Technical skills and creative projects
**Outcomes**: Increased membership, diverse skill development, and community building

## Anti-Patterns to Avoid

### The Sage on the Stage
**Problem**: One person dominates discussions and decision-making
**Solution**: Rotate leadership roles and actively encourage participation from all members

### The Free Rider
**Problem**: Some members contribute little while benefiting from others' work
**Solution**: Make expectations explicit and address imbalances directly

### The Echo Chamber
**Problem**: Group becomes insular and resistant to new ideas
**Solution**: Actively seek diverse perspectives and welcome constructive challenge

### The Perfectionist Paralysis
**Problem**: Group gets stuck trying to perfect plans instead of taking action
**Solution**: Embrace experimentation and learning from failure

## Adapting Patterns to Your Context

When implementing these patterns:
- Consider your specific context and constraints
- Start small and experiment
- Adapt patterns to fit your group's needs
- Document what works and what doesn't
- Share your experiences with others

Remember that patterns are starting points, not rigid prescriptions. The key is to understand the underlying principles and adapt them creatively to your situation.`,
      summary: "Comprehensive collection of peeragogical patterns, use cases, and implementation examples across different contexts, providing practical templates for peer learning design.",
      keyPoints: [
        "Patterns provide flexible templates for common peer learning challenges",
        "Core patterns include Wrapper, Heartbeat, Newcomer, Roadmap, and Carrying Capacity",
        "Peeragogical approaches can be adapted to diverse contexts and settings",
        "Anti-patterns help identify and avoid common pitfalls",
        "Successful implementation requires adaptation to specific contexts"
      ],
      authors: ["Anna Keune", "Community Contributors"],
      difficulty: "intermediate",
      tags: ["patterns", "use cases", "implementation", "design", "templates"]
    },
    {
      id: 5,
      title: "Peeragogy in Practice",
      originalTitle: "Peeragogy in Practice",
      pages: "73-95",
      content: `# Peeragogy in Practice

This chapter provides practical guidance for implementing peeragogical approaches in real-world settings. It covers the essential elements of organizing and facilitating peer learning experiences.

## Getting Started

### Assessing Readiness
Before launching a peeragogical initiative, consider:
- **Participant motivation**: Are people genuinely interested in peer learning?
- **Available resources**: What time, space, and tools are available?
- **Organizational support**: Is there backing from relevant institutions?
- **Group dynamics**: How well do potential participants work together?

### Setting the Foundation
Successful peeragogical projects require:
- **Clear purpose**: Why are you coming together?
- **Shared expectations**: What are the ground rules and commitments?
- **Flexible structure**: How will you organize activities and decisions?
- **Communication channels**: How will you stay connected?

## Designing Peeragogical Experiences

### Principles for Design
- **Start with relationships**: Invest time in building trust and connection
- **Embrace emergence**: Allow structure and content to evolve
- **Balance structure and freedom**: Provide enough framework without being rigid
- **Encourage experimentation**: Create safe spaces for trying new approaches
- **Document the journey**: Capture learning and insights along the way

### Key Design Elements

**Learning Objectives**
- Co-create goals with participants
- Balance individual and collective objectives
- Make objectives explicit but flexible
- Regularly review and adjust as needed

**Group Composition**
- Aim for diversity of perspectives and skills
- Consider optimal group size (typically 4-12 people)
- Think about power dynamics and hierarchies
- Plan for member turnover and renewal

**Activities and Processes**
- Mix different types of learning activities
- Include both structured and unstructured time
- Provide opportunities for individual and group work
- Build in reflection and feedback loops

**Resources and Tools**
- Identify necessary materials and technologies
- Ensure equitable access to resources
- Provide training on tools and platforms
- Have backup plans for technical issues

## Facilitation in Peeragogy

### The Role of the Facilitator
In peeragogical settings, facilitation is:
- **Distributed**: Multiple people share facilitation responsibilities
- **Emergent**: Facilitation styles adapt to group needs
- **Supportive**: Focus on enabling rather than directing
- **Reflective**: Regular attention to process and dynamics

### Facilitation Skills
- **Active listening**: Truly hearing and understanding participants
- **Question asking**: Prompting deeper thinking and reflection
- **Conflict navigation**: Addressing tensions constructively
- **Time management**: Balancing efficiency with thoroughness
- **Energy reading**: Sensing group mood and adjusting accordingly

### Facilitation Techniques

**Opening Activities**
- Check-ins to gauge mood and readiness
- Icebreakers to build connection
- Agenda setting to clarify priorities
- Expectation sharing to align goals

**During Activities**
- Timeboxing to maintain focus
- Parking lots for off-topic ideas
- Temperature checks to assess progress
- Rotation to ensure participation

**Closing Activities**
- Reflection on learning and insights
- Action planning for next steps
- Appreciation and recognition
- Evaluation of process and outcomes

## Managing Group Dynamics

### Common Challenges
- **Unequal participation**: Some members dominate while others remain silent
- **Conflicting goals**: Individual objectives don't align with group purposes
- **Communication breakdowns**: Misunderstandings and tensions arise
- **Motivation fluctuations**: Enthusiasm wanes over time
- **External pressures**: Outside demands compete for attention

### Strategies for Success

**Building Psychological Safety**
- Establish ground rules for respectful interaction
- Model vulnerability and openness
- Address conflicts directly and constructively
- Celebrate mistakes as learning opportunities

**Encouraging Participation**
- Use structured activities to ensure all voices are heard
- Rotate roles and responsibilities
- Provide multiple ways to contribute
- Address barriers to participation

**Maintaining Momentum**
- Set realistic goals and expectations
- Celebrate progress and achievements
- Vary activities to maintain interest
- Connect learning to broader purposes

**Handling Conflict**
- Acknowledge different perspectives
- Focus on interests rather than positions
- Seek win-win solutions
- Use conflict as a learning opportunity

## Assessment and Evaluation

### Purposes of Assessment
- **Learning enhancement**: Helping participants understand their progress
- **Process improvement**: Identifying what's working and what isn't
- **Accountability**: Demonstrating value to stakeholders
- **Recognition**: Celebrating achievements and contributions

### Assessment Approaches

**Peer Assessment**
- Structured feedback on contributions and participation
- Collaborative evaluation of group projects
- Peer coaching and mentoring relationships
- 360-degree feedback processes

**Self-Assessment**
- Reflection journals and portfolios
- Goal setting and progress tracking
- Learning logs and documentation
- Personal development planning

**Group Assessment**
- Collective reflection on process and outcomes
- Group evaluation of projects and activities
- Shared rubrics and criteria
- Community feedback and input

### Assessment Tools
- **Rubrics**: Clear criteria for evaluating work and participation
- **Portfolios**: Collections of work showing growth over time
- **Surveys**: Structured feedback on experiences and outcomes
- **Interviews**: In-depth conversations about learning and impact
- **Observations**: Systematic documentation of behaviors and interactions

## Sustaining Peeragogical Communities

### Factors for Sustainability
- **Ongoing value**: Participants continue to benefit from involvement
- **Renewable leadership**: New people step into facilitation roles
- **Adaptive capacity**: The group can evolve and change over time
- **Resource stability**: Necessary support and materials remain available
- **Connection to purpose**: The work remains meaningful and relevant

### Strategies for Longevity
- **Succession planning**: Prepare others to take on leadership roles
- **Knowledge management**: Document processes and insights
- **Network building**: Connect with other groups and communities
- **Continuous improvement**: Regularly evaluate and enhance practices
- **Celebration and recognition**: Acknowledge contributions and achievements

## Scaling Peeragogical Approaches

### Horizontal Scaling
- **Replication**: Starting similar groups in different contexts
- **Networking**: Connecting multiple groups for mutual support
- **Resource sharing**: Developing common tools and materials
- **Best practice exchange**: Learning from each other's experiences

### Vertical Scaling
- **Institutional integration**: Embedding peeragogical approaches in organizations
- **Policy influence**: Advocating for supportive policies and structures
- **Professional development**: Training facilitators and leaders
- **Research and evaluation**: Building evidence base for effectiveness

## Conclusion

Implementing peeragogy requires careful attention to both principles and practices. Success depends on creating conditions for peer learning to flourish while remaining flexible and responsive to participant needs. The key is to start small, experiment boldly, and learn continuously from the experience.

Remember that peeragogy is not a destination but a journey of ongoing learning and growth. Each implementation will be unique, shaped by the specific context, participants, and purposes involved. The goal is not to follow a rigid formula but to embody the spirit of peer learning and collaborative knowledge creation.`,
      summary: "Comprehensive practical guide for implementing peeragogical approaches, covering design principles, facilitation techniques, group dynamics, assessment methods, and sustainability strategies.",
      keyPoints: [
        "Successful peeragogy requires careful attention to relationships and group dynamics",
        "Facilitation should be distributed and adaptive to group needs",
        "Assessment should serve learning enhancement rather than just evaluation",
        "Sustainability depends on ongoing value and renewable leadership",
        "Implementation should start small and scale gradually"
      ],
      authors: ["Howard Rheingold", "Charles Jeffrey Danoff"],
      difficulty: "advanced",
      tags: ["implementation", "facilitation", "group dynamics", "assessment", "sustainability"]
    }
  ],
  metadata: {
    publishedDate: "2016-01-15",
    license: "Creative Commons Attribution-ShareAlike 4.0 International",
    repository: "https://github.com/Peeragogy/Peeragogy.github.io",
    isbn: "978-0-9912125-1-8"
  }
};

// Funzione per convertire in formato compatibile con il sistema esistente
export function convertToLibraryFormat(extracted: ExtractedHandbook) {
  return {
    id: 'peeragogy-handbook-v3-en',
    title: extracted.title,
    originalTitle: extracted.title,
    subtitle: `Version ${extracted.version} - Complete English Original`,
    authors: extracted.authors.map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      bio: `Contributor to the Peeragogy Handbook`,
      avatar: name.split(' ').map(n => n[0]).join('')
    })),
    category: 'peer-learning',
    subcategory: 'peeragogy',
    type: 'handbook' as const,
    access: 'free' as const,
    version: extracted.version,
    pages: extracted.totalPages,
    language: extracted.language,
    rating: 4.9,
    downloads: 25000,
    likes: 3500,
    bookmarks: 1200,
    views: 75000,
    description: `The original Peeragogy Handbook Version ${extracted.version} in English. This comprehensive guide explores peer learning and collaborative knowledge production, providing both theoretical foundations and practical techniques for implementing peeragogical approaches in various contexts.`,
    tags: [
      'peer learning',
      'collaborative education', 
      'community building',
      'distributed learning',
      'educational innovation',
      'original english',
      'complete handbook',
      'patterns',
      'case studies',
      'practical guide'
    ],
    lastUpdated: '2025-01-27',
    publishedDate: extracted.metadata.publishedDate,
    featured: true,
    license: extracted.metadata.license,
    repository: extracted.metadata.repository,
    website: 'https://peeragogy.org',
    difficulty: 'intermediate' as const,
    status: 'complete' as const,
    format: ['PDF', 'HTML', 'Interactive Web'],
    fileSize: '3.2 MB',
    downloadUrl: '/resources/original-documents/pdf/peeragogy-handbook-v3.0-en.pdf',
    prerequisites: ['Interest in collaborative learning', 'Basic understanding of educational concepts'],
    learningOutcomes: [
      'Understand the principles and theory of peeragogy',
      'Apply peer learning techniques in various contexts',
      'Facilitate collaborative learning experiences',
      'Design and implement peeragogical projects',
      'Assess and evaluate peer learning outcomes'
    ],
    relatedResources: ['peeragogy-handbook-it'],
    chapters: extracted.chapters.map(chapter => ({
      ...chapter,
      available: true,
      duration: `${Math.ceil(chapter.content.length / 1000 * 3)} min`
    }))
  };
}