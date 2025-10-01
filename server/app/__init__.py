from datetime import date
from flask import Flask
from flask_cors import CORS
from config import DATABASE_FILENAME                                        # Imports Flask
from .models import db, Projects, Documents, Events                                 # Imports database and schemas from models
from datetime import date                                                   # Import data format from datetime

# Function to hardcode the project database 
def hardcode_projects_database(app):   
    with app.app_context():                                                 # Descriptor to access Flask obect (the database here)                            
        Projects.query.delete()                                             # Delete all rows in Projects table

        # Hardcode project rows
        tictactoe = Projects(name="TictacToe", desc="""Developed a graphical Tic-Tac-Toe game enabling users to play against either a computer AI or another user, utilizing a fully interactive GUI for board visualization and gameplay. Independently researched and implemented the minimax algorithm to create an optimal AI opponent capable of always securing at least a tie, exceeding the original project requirements. Additionally explored alpha-beta pruning techniques as part of personal study into adversarial search algorithms, further deepening understanding of AI optimization strategies in game environments.""", 
                            lock=False, wip=False, month_year=date(2021, 5, 14), language=["Java"], type=["Software"])
        recipEats_app = Projects(name="RecipEats", desc="""Designed and developed a recipe-sharing mobile application for a high school app development course, allowing users to create accounts, log in, and interact with a community of fellow cooks. Implemented key features such as recipe posting, search, and liking functionality, as well as user profile and post management, with a robust interface for editing account information and recipes. Each recipe entry supports comprehensive details including summary, prep time, serving size, ingredients, tools, nutritional info, allergens, and cost. Utilized Firebase to manage user authentication and store application data, and implemented a dynamic loading screen to enhance user experience during data retrieval.""",
                            lock=False, wip=False, month_year=date(2022, 6, 6), language=["Dart"], type=["Software"])
        eecs280_p2_cv = Projects(name="Programming and Intro Data Structures (EECS 280): Image Processing", desc="""Developed an image processing application in C++ implementing core algorithms such as energy matrix calculation, cost matrix computation, and the seam carving technique to intelligently resize images by removing the least important pixel seams. Gained practical experience with C++ fundamentals, including pointers, dynamic memory management, and data structures such as structs, as well as file I/O operations. The project demonstrates the ability to manipulate image data and apply algorithmic solutions for content-aware image resizing.""",
                                lock=True, wip=False, month_year=date(2022, 9, 29), language=["C++"], type=["Software"])
        eecs280_p3_euchre = Projects(name="Programming and Intro Data Structures (EECS 280): Euchre", desc="""Designed and implemented a simulation of the card game Euchre in C++, supporting both a human-controlled player (reading moves from an input file) and a simple AI opponent. This project leveraged object-oriented programming concepts such as abstract data types, inheritance, and polymorphism to create a flexible and extensible game architecture, enhancing proficiency in C++ software design and implementation.""",
                                    lock=True, wip=False, month_year=date(2022, 10, 19), language=["C++"], type=["Software"])
        eecs280_p5_ml = Projects(name="Programming and Intro Data Structures (EECS 280): Machine Learning", desc="""Developed a Piazza label classifier in C++ utilizing a bag-of-words model to represent post content. Implemented a Bayesian classification approach, calculating the log probability of each label based on the distribution of words within a post. This project strengthened skills in probabilistic modeling, text classification, and algorithmic problem-solving using C++.""",
                                lock=True, wip=False, month_year=date(2022, 11, 18), language=["C++"], type=["Software", "AI/ML"])
        eecs281_p1_back_to_the_ship = Projects(name="Data Structures and Algorithms (EECS 281): Back to the Ship!", desc="""Implemented pathfinding algorithms to navigate an agent from a starting point to an exit within a 3D maze simulating a multi-level space station. Utilized both Breadth-First Search (BFS) and Depth-First Search (DFS) to explore possible routes, accounting for movement across ten levels via elevators that transfer the agent vertically while preserving 2D coordinates. This project enhanced proficiency in graph traversal algorithms, multi-dimensional data structures, and problem-solving within constrained environments.""",
                                        lock=True, wip=False, month_year=date(2023, 1, 13), language=["C++"], type=["Software"])
        eecs281_p2_a_new_heap = Projects(name="Data Structures and Algorithms (EECS 281): Star Wars: Episode X - A New Heap", desc="""Developed an event-driven simulation of a conflict-resolution system using priority queues and a running median algorithm, modeled as a multi-planet Star Wars battle scenario. Simulated deployments of Jedi and Sith across planets, with conflict events triggered under specific constraints and planet states updated dynamically. Utilized a Force-Sensitivity metric to assign battle priorities and drive event sequencing. Designed the simulation framework to be adaptable for analogous scenarios, such as modeling buyer and seller interactions in stock market environments. This project strengthened skills in event-based programming, algorithmic prioritization, and complex system modeling.""",
                                    lock=True, wip=False, month_year=date(2023, 2, 8), language=["C++"], type=["Software"])
        eecs281_p3_sillyql = Projects(name="Data Structures and Algorithms (EECS 281): SillyQL", desc="""Designed and implemented a basic relational database in C++ featuring an interface modeled after a subset of standard query languages. Supported core database commands such as Create, Remove, Insert, Join, Delete, and Generate, utilizing hashmaps for efficient data storage and retrieval. This project developed skills in data structure design, database operations, and algorithmic problem solving within a systems programming context.""", 
                                lock=True, wip=False, month_year=date(2023, 3, 29), language=["C++"], type=["Software"])
        eecs281_p4_pokemon = Projects(name="Data Structures and Algorithms (EECS 281): Pokemon", desc="""Developed a comprehensive graph algorithms project simulating a Pokémon trainer traversing a map to battle other trainers and catch every Pokémon. Implemented Prim’s and Kruskal’s algorithms to compute the minimum spanning tree (MST), determining the shortest set of connections between all locations. Extended the project to approximate solutions for the Traveling Salesperson Problem (TSP) using heuristic methods to find efficient routes covering all nodes and returning to the starting point. Further enhanced the solution by implementing a branch-and-bound algorithm to compute optimal TSP paths. This project strengthened expertise in graph theory, algorithm design, and combinatorial optimization.""", 
                                lock=True, wip=False, month_year=date(2023, 4, 7), language=["C++"], type=["Software"])
        eecs370_p1_asm = Projects(name="Intro to Computer Organization (EECS 370): Assembler, Simulator, and Multiplication", desc="""Developed a low-level assembler and simulator, handling assembly and machine code translation and simulation. Designed and implemented an assembler that processes input assembly-language files and generates corresponding machine code output. Built a simulator to execute machine code instructions, outputting register states after each operation to facilitate debugging and analysis. Extended functionality by implementing multiplication through repeated addition at the assembly level, demonstrating a strong understanding of computer architecture, instruction set design, and low-level programming concepts.""", 
                            lock=True, wip=False, month_year=date(2023, 9, 11), language=["C"], type=["Software"])
        eecs370_p2_al = Projects(name="Intro to Computer Organization (EECS 370): Assembler and Linker", desc="""Designed and implemented a low-level assembler and linker system. Developed an assembler that translates assembly language source files into object files containing a header, symbol table, and relocation table. Built a linker capable of combining multiple object files into a single executable machine code file, resolving symbols and applying relocations as needed. This project strengthened skills in computer architecture, binary file formats, and systems-level programming.""", 
                            lock=True, wip=False, month_year=date(2023, 9, 28), language=["C"], type=["Software"])
        eecs370_p3_pipeline = Projects(name="Intro to Computer Organization (EECS 370): Multi-cycle Pipeline", desc="""Designed and implemented a multi-cycle pipelined processor supporting L2-CK instructions, featuring data forwarding and basic branch prediction mechanisms. Created a simulator that processes assembly-language input files and outputs the register states after each cycle. Addressed control and data hazards through techniques such as data forwarding, stalling, and instruction squashing. This project enhanced understanding of computer architecture, pipeline design, and hardware-level performance optimization.""",
                            lock=True, wip=False, month_year=date(2023, 10, 23), language=["C"], type=["Software"])
        eecs370_p4_cache = Projects(name="Intro to Computer Organization (EECS 370): Cache", desc="""Developed a simulator to model data movement between cache, processor, and memory, focusing on a set-associative cache architecture. Implemented features including write-back policy and least recently used (LRU) block eviction. The simulator allows for configurable parameters such as block size (in words), number of sets, and blocks per set. This project strengthened skills in computer architecture, memory hierarchy, and systems-level programming.""",
                            lock=True, wip=False, month_year=date(2023, 11, 16), language=["C"], type=["Software"])
        eecs485_p1_insta485_statuc = Projects(name="Web Systems (EECS 485): Templated Static Site Generator", desc="""Developed a templated web application inspired by Instagram, featuring the core framework of a home page and individual user pages. Utilized JSON files to dynamically generate content and implemented Jinja templates to render multiple distinct pages with varying user data. This project demonstrated proficiency in server-side templating, dynamic content generation, and web application architecture.""", 
                                        lock=True, wip=False, month_year=date(2024, 9, 5), language=["HTML", "Python", "Shell"], type=["Software"])
        eecs485_p2_insta485_server = Projects(name="Web Systems (EECS 485): Server-side Dynamic Pages", desc="""Designed and implemented a server-side dynamic web application modeled after Instagram, using Flask as the backend framework. Employed a basic SQLite database to store and manage application data, enabling dynamic routing and information retrieval. Developed multiple pages served via API calls and rendered with Jinja templating, demonstrating proficiency in backend development, database integration, and dynamic web content generation.""", 
                                        lock=True, wip=False, month_year=date(2024, 9, 18), language=["HTML", "Python", "Shell"], type=["Software"])
        eecs485_p3_insta485_client = Projects(name="Web Systems (EECS 485): Client-side Dynamic Pages", desc="""Developed a client-side dynamic web application inspired by Instagram, utilizing React for the frontend and Flask for the backend. Implemented REST API endpoints in Flask to handle data retrieval and updates, with the React client making asynchronous calls to keep the site content updated. Incorporated interactive features such as double-click to like and infinite scroll for enhanced user experience. This project highlights skills in full-stack web development, RESTful API design, and modern client-side interactivity.""", 
                                        lock=True, wip=False, month_year=date(2024, 10, 2), language=["HTML", "Python", "Shell", "JavaScript"], type=["Software"])
        eecs485_p4_mapreduce = Projects(name="Web Systems (EECS 485): MapReduce", desc="""Designed and implemented a distributed word frequency counter using the MapReduce framework, with parallel processing across multiple machines. Architected a system with a single manager process and multiple worker processes, communicating via TCP for task distribution and UDP for heartbeat monitoring. Employed round-robin job allocation, where the manager partitions a large file and assigns mapping tasks to workers, redistributing intermediate data for reduction upon completion. Incorporated fault tolerance by reassigning unfinished tasks from failed workers, as detected through periodic heartbeats. This project strengthened skills in distributed systems, parallel computing, fault tolerance, and network programming.""", 
                                lock=True, wip=False, month_year=date(2024, 10, 23), language=["Python", "Shell"], type=["Software"])
        eecs485_p5_search_engine = Projects(name="Web Systems (EECS 485): Search Engine", desc="""Developed a search engine that ranks and displays the most relevant websites in response to user queries, utilizing tf-idf and PageRank algorithms. Implemented a web crawler to scrape and index content from multiple files, leveraging a distributed MapReduce framework to efficiently compute term frequency-inverse document frequency (tf-idf) values. During query processing, calculated document relevance by combining PageRank scores with cosine similarity between query and document tf-idf vectors, and presented results sorted by overall score with pagination for user-friendly navigation. This project reinforced expertise in information retrieval, distributed computing, and applied algorithm design.""", 
                                        lock=True, wip=False, month_year=date(2024, 11, 15), language=["Python", "Shell", "HTML", "CSS"], type=["Software"])
        eecs482_p1_monitor = Projects(name="Introduction to Operating Systems (EECS 482): Multi-threaded Programming", desc="""Implemented a concurrent pizza delivery simulation using mutexes, condition variables, and monitors to coordinate multiple clients and drivers for maximum concurrency and correctness. Modeled clients placing orders from various coordinates and drivers accepting deliveries only when they are mutually closest to a client, ensuring exclusive assignment. Managed delivery lifecycle including driver travel, payment exchange, and readiness for new orders, while preventing race conditions such as double assignment of clients or premature advancement of drivers. This project enhanced proficiency in concurrent programming, resource synchronization, and managing complex interactions in multi-threaded environments.""",
                                lock=True, wip=False, month_year=date(2025, 1, 29), language=["C++"], type=["Software"])
        eecs482_p2_thread = Projects(name="Intro to Operating Systems (EECS 482): Thread Library", desc="""Designed and implemented a custom thread library supporting advanced multithreading features, including thread management, mutexes, condition variables, and multi-CPU support. Developed thread class functionality such as join and yield, mutex class operations like lock and unlock, and condition variable methods including wait, signal, and broadcast. Engineered a CPU class to simulate multiple CPU cores, handling timer and inter-processor interrupts to enable preemptive context switching and increase concurrency. Utilized CPU guards and RAII principles to ensure safe and efficient execution, preventing deadlocks and ensuring proper memory cleanup. This project strengthened expertise in concurrent programming, synchronization techniques, and systems-level design.""",
                                lock=True, wip=False, month_year=date(2025, 2, 25), language=["C++"], type=["Software"])
        eecs482_p3_pager = Projects(name="Intro to Operating Systems (EECS 482): Pager", desc="""Developed a virtual memory pager to manage address spaces for parent and child processes, simulating data movement between disk and physical memory for both swap-backed and file-backed pages. Implemented memory management features including shared file-backed pages, process-independent swap-backed pages, and dynamic sharing of swap space when data is identical among processes, with copy-on-write on modification. Managed page permissions using read/write bits, tracked page states with dirty and referenced bits, and employed the clock page replacement algorithm for efficient memory eviction. Supported key virtual memory operations such as mapping, yielding, context switching, forking, and destruction of address spaces. This project enhanced understanding of virtual memory, process isolation, and efficient resource management in operating systems.""", 
                            lock=True, wip=False, month_year=date(2025, 3, 26), language=["C++"], type=["Software"])
        eecs482_p4_file_system = Projects(name="Intro to Operating Systems (EECS 482): Network File System", desc="""Designed and implemented a network file system enabling processes to perform read, write, create, and delete operations on files and directories via socket-based client-server communication. Supported concurrent access from multiple processes using reader-writer and upgradable locks to ensure data correctness and consistency. Modeled directory structures with access control, allowing only the owner to manipulate non-root directories and files, while maintaining universal access to the root directory. Simulated slow disk I/O for file operations and incorporated robust error handling to validate and execute requests reliably. On server initialization, implemented a system walk to reconstruct the file hierarchy from existing inodes when provided. This project strengthened proficiency in distributed systems, concurrency control, file system architecture, and network programming.""", 
                                lock=True, wip=False, month_year=date(2025, 4, 26), language=["C++"], type=["Software"])
        
        # Add projects items into project table
        db.session.add_all([
            tictactoe,
            recipEats_app,
            eecs280_p2_cv,
            eecs280_p3_euchre,
            eecs280_p5_ml,
            eecs281_p1_back_to_the_ship,
            eecs281_p2_a_new_heap,
            eecs281_p3_sillyql,
            eecs281_p4_pokemon,
            eecs370_p1_asm,
            eecs370_p2_al,
            eecs370_p3_pipeline,
            eecs370_p4_cache,
            eecs485_p1_insta485_statuc,
            eecs485_p2_insta485_server,
            eecs485_p3_insta485_client,
            eecs485_p4_mapreduce,
            eecs485_p5_search_engine,
            eecs482_p1_monitor,
            eecs482_p2_thread,
            eecs482_p3_pager,
            eecs482_p4_file_system
        ])
        db.session.commit()                                            # Commit changes to project table
        print("Database created and populated.")

def hardcode_documents_database(app):
    with app.app_context():                                                 # Descriptor to access Flask obect (the database here)                            
        Documents.query.delete()                                            # Delete all rows in Documents table

        AI_ML_Resume = Documents(title="AI/ML Resume", desc="This resume is designed for roles in artificial intelligence and machine learning, focusing on experiences and projects that showcase hands-on expertise in building, training, and evaluating machine learning and deep learning models. The document highlights practical applications such as computer vision, data-driven decision systems, and real-world AI deployments, emphasizing technical skills in developing solutions for image analysis, pattern recognition, and natural language processing. Each section is crafted to demonstrate relevant accomplishments and capabilities for organizations seeking candidates with a strong background in applied AI and a proven ability to translate data and research into impactful, production-ready solutions.", last_updated=date.today(), file_path="/documents/AI_ML_Resume.pdf")
        Embedded_Resume = Documents(title="Embedded Systems Resume", desc="This resume is specifically tailored for positions in hardware engineering and embedded systems, emphasizing experiences and projects that involve hands-on work with hardware components, electronic circuits, and embedded software development. It highlights practical applications in fields such as aerospace and robotics, showcasing skills in designing, building, and programming embedded solutions for real-world systems. The document brings forward accomplishments and technical capabilities relevant to organizations seeking candidates experienced in integrating hardware and software, interfacing with sensors and actuators, and solving challenges in high-reliability and real-time environments.", last_updated=date.today(), file_path="/documents/Embedded_Systems_Resume.pdf")
        Software_Resume = Documents(title="Software Engineering Resume", desc="This resume is specifically crafted for positions in software engineering, highlighting projects and experiences focused on advanced programming, robust algorithm development, and large-scale system design. Emphasis is placed on hands-on work involving the practical application of data structures, algorithmic problem-solving, and scalable software solutions, as developed through collaborative projects in areas such as web applications, user interface/experience design, and foundational computer science concepts. The following sections showcase technical expertise and accomplishments most relevant to organizations seeking candidates with strong proficiency in software development, code quality, and building efficient, maintainable systems.", last_updated=date.today(), file_path="/documents/Software_Engineering_Resume.pdf")
        Transcript = Documents(title="University of Michigan Unofficial Transcript", desc="This document is an unofficial transcript from the University of Michigan, providing a comprehensive record of undergraduate coursework. It details both transferred and completed classes, presenting a chronological timeline that includes each course taken, the corresponding semester, and the grade received. This transcript serves as an authoritative summary of the student’s academic history and performance during their undergraduate studies.", last_updated=date.today(), file_path="/documents/Transcript.pdf")

        db.session.add_all([
            AI_ML_Resume, 
            Embedded_Resume,
            Software_Resume, 
            Transcript
        ])
        db.session.commit()                                            # Commit changes to documents table
        print("Database created and populated.")

def hardcode_timeline_database(app):
     with app.app_context():                                                 # Descriptor to access Flask obect (the database here)                            
        Events.query.delete()                                               # Delete all rows in Documents table

        tictactoe_event = Events(
            title="TictacToe",
            desc="""Developed a graphical Tic-Tac-Toe game enabling users to play against either a computer AI or another user, utilizing a fully interactive GUI for board visualization and gameplay. Independently researched and implemented the minimax algorithm to create an optimal AI opponent capable of always securing at least a tie, exceeding the original project requirements. Additionally explored alpha-beta pruning techniques as part of personal study into adversarial search algorithms, further deepening understanding of AI optimization strategies in game environments.""",
            tags=["Projects", "Academics"],
            start=date(2021, 5, 14),
            end=date(2021, 6, 1),
            images=[]
        )

        recipEats_app_event = Events(
            title="RecipEats",
            desc="""Designed and developed a recipe-sharing mobile application for a high school app development course, allowing users to create accounts, log in, and interact with a community of fellow cooks. Implemented key features such as recipe posting, search, and liking functionality, as well as user profile and post management, with a robust interface for editing account information and recipes. Each recipe entry supports comprehensive details including summary, prep time, serving size, ingredients, tools, nutritional info, allergens, and cost. Utilized Firebase to manage user authentication and store application data, and implemented a dynamic loading screen to enhance user experience during data retrieval.""",
            tags=["Projects", "Academics"],
            start=date(2022, 6, 6),
            end=date(2022, 6, 30),
            images=[]
        )

        eecs280_p2_cv_event = Events(
            title="Programming and Intro Data Structures (EECS 280): Image Processing",
            desc="""Developed an image processing application in C++ implementing core algorithms such as energy matrix calculation, cost matrix computation, and the seam carving technique to intelligently resize images by removing the least important pixel seams. Gained practical experience with C++ fundamentals, including pointers, dynamic memory management, and data structures such as structs, as well as file I/O operations. The project demonstrates the ability to manipulate image data and apply algorithmic solutions for content-aware image resizing.""",
            tags=["Projects", "Academics"],
            start=date(2022, 9, 12),
            end=date(2022, 9, 29),
            images=[]
        )

        eecs280_p3_euchre_event = Events(
            title="Programming and Intro Data Structures (EECS 280): Euchre",
            desc="""Designed and implemented a simulation of the card game Euchre in C++, supporting both a human-controlled player (reading moves from an input file) and a simple AI opponent. This project leveraged object-oriented programming concepts such as abstract data types, inheritance, and polymorphism to create a flexible and extensible game architecture, enhancing proficiency in C++ software design and implementation.""",
            tags=["Projects", "Academics"],
            start=date(2022, 9, 28),
            end=date(2022, 10, 19),
            images=[]
        )

        eecs280_p5_ml_event = Events(
            title="Programming and Intro Data Structures (EECS 280): Machine Learning",
            desc="""Developed a Piazza label classifier in C++ utilizing a bag-of-words model to represent post content. Implemented a Bayesian classification approach, calculating the log probability of each label based on the distribution of words within a post. This project strengthened skills in probabilistic modeling, text classification, and algorithmic problem-solving using C++.""",
            tags=["Projects", "Academics"],
            start=date(2022, 11, 18),
            end=date(2022, 11, 27),
            images=[]
        )

        eecs281_p1_back_to_the_ship_event = Events(
            title="Data Structures and Algorithms (EECS 281): Back to the Ship!",
            desc="""Implemented pathfinding algorithms to navigate an agent from a starting point to an exit within a 3D maze simulating a multi-level space station. Utilized both Breadth-First Search (BFS) and Depth-First Search (DFS) to explore possible routes, accounting for movement across ten levels via elevators that transfer the agent vertically while preserving 2D coordinates. This project enhanced proficiency in graph traversal algorithms, multi-dimensional data structures, and problem-solving within constrained environments.""",
            tags=["Projects", "Academics"],
            start=date(2023, 1, 9),
            end=date(2023, 1, 13),
            images=[]
        )

        eecs281_p2_a_new_heap_event = Events(
            title="Data Structures and Algorithms (EECS 281): Star Wars: Episode X - A New Heap",
            desc="""Developed an event-driven simulation of a conflict-resolution system using priority queues and a running median algorithm, modeled as a multi-planet Star Wars battle scenario. Simulated deployments of Jedi and Sith across planets, with conflict events triggered under specific constraints and planet states updated dynamically. Utilized a Force-Sensitivity metric to assign battle priorities and drive event sequencing. Designed the simulation framework to be adaptable for analogous scenarios, such as modeling buyer and seller interactions in stock market environments. This project strengthened skills in event-based programming, algorithmic prioritization, and complex system modeling.""",
            tags=["Projects", "Academics"],
            start=date(2023, 2, 8),
            end=date(2023, 2, 17),
            images=[]
        )

        eecs281_p3_sillyql_event = Events(
            title="Data Structures and Algorithms (EECS 281): SillyQL",
            desc="""Designed and implemented a basic relational database in C++ featuring an interface modeled after a subset of standard query languages. Supported core database commands such as Create, Remove, Insert, Join, Delete, and Generate, utilizing hashmaps for efficient data storage and retrieval. This project developed skills in data structure design, database operations, and algorithmic problem solving within a systems programming context.""",
            tags=["Projects", "Academics"],
            start=date(2023, 3, 8),
            end=date(2023, 3, 29),
            images=[]
        )

        eecs281_p4_pokemon_event = Events(
            title="Data Structures and Algorithms (EECS 281): Pokemon",
            desc="""Developed a comprehensive graph algorithms project simulating a Pokémon trainer traversing a map to battle other trainers and catch every Pokémon. Implemented Prim’s and Kruskal’s algorithms to compute the minimum spanning tree (MST), determining the shortest set of connections between all locations. Extended the project to approximate solutions for the Traveling Salesperson Problem (TSP) using heuristic methods to find efficient routes covering all nodes and returning to the starting point. Further enhanced the solution by implementing a branch-and-bound algorithm to compute optimal TSP paths. This project strengthened expertise in graph theory, algorithm design, and combinatorial optimization.""",
            tags=["Projects", "Academics"],
            start=date(2023, 4, 7),
            end=date(2023, 4, 20),
            images=[]
        )

        eecs370_p1_asm_event = Events(
            title="Intro to Computer Organization (EECS 370): Assembler, Simulator, and Multiplication",
            desc="""Developed a low-level assembler and simulator, handling assembly and machine code translation and simulation. Designed and implemented an assembler that processes input assembly-language files and generates corresponding machine code output. Built a simulator to execute machine code instructions, outputting register states after each operation to facilitate debugging and analysis. Extended functionality by implementing multiplication through repeated addition at the assembly level, demonstrating a strong understanding of computer architecture, instruction set design, and low-level programming concepts.""",
            tags=["Projects", "Academics"],
            start=date(2023, 8, 29),
            end=date(2023, 9, 11),
            images=[]
        )

        eecs370_p2_al_event = Events(
            title="Intro to Computer Organization (EECS 370): Assembler and Linker",
            desc="""Designed and implemented a low-level assembler and linker system. Developed an assembler that translates assembly language source files into object files containing a header, symbol table, and relocation table. Built a linker capable of combining multiple object files into a single executable machine code file, resolving symbols and applying relocations as needed. This project strengthened skills in computer architecture, binary file formats, and systems-level programming.""",
            tags=["Projects", "Academics"],
            start=date(2023, 9, 15),
            end=date(2023, 9, 28),
            images=[]
        )

        eecs370_p3_pipeline_event = Events(
            title="Intro to Computer Organization (EECS 370): Multi-cycle Pipeline",
            desc="""Designed and implemented a multi-cycle pipelined processor supporting L2-CK instructions, featuring data forwarding and basic branch prediction mechanisms. Created a simulator that processes assembly-language input files and outputs the register states after each cycle. Addressed control and data hazards through techniques such as data forwarding, stalling, and instruction squashing. This project enhanced understanding of computer architecture, pipeline design, and hardware-level performance optimization.""",
            tags=["Projects", "Academics"],
            start=date(2023, 10, 5),
            end=date(2023, 10, 23),
            images=[]
        )

        eecs370_p4_cache_event = Events(
            title="Intro to Computer Organization (EECS 370): Cache",
            desc="""Developed a simulator to model data movement between cache, processor, and memory, focusing on a set-associative cache architecture. Implemented features including write-back policy and least recently used (LRU) block eviction. The simulator allows for configurable parameters such as block size (in words), number of sets, and blocks per set. This project strengthened skills in computer architecture, memory hierarchy, and systems-level programming.""",
            tags=["Projects", "Academics"],
            start=date(2023, 11, 2),
            end=date(2023, 11, 16),
            images=[]
        )

        eecs485_p1_insta485_statuc_event = Events(
            title="Web Systems (EECS 485): Templated Static Site Generator",
            desc="""Developed a templated web application inspired by Instagram, featuring the core framework of a home page and individual user pages. Utilized JSON files to dynamically generate content and implemented Jinja templates to render multiple distinct pages with varying user data. This project demonstrated proficiency in server-side templating, dynamic content generation, and web application architecture.""",
            tags=["Projects", "Academics"],
            start=date(2024, 8, 29),
            end=date(2024, 9, 5),
            images=[]
        )

        eecs485_p2_insta485_server_event = Events(
            title="Web Systems (EECS 485): Server-side Dynamic Pages",
            desc="""Designed and implemented a server-side dynamic web application modeled after Instagram, using Flask as the backend framework. Employed a basic SQLite database to store and manage application data, enabling dynamic routing and information retrieval. Developed multiple pages served via API calls and rendered with Jinja templating, demonstrating proficiency in backend development, database integration, and dynamic web content generation.""",
            tags=["Projects", "Academics"],
            start=date(2024, 9, 3),
            end=date(2024, 9, 18),
            images=[]
        )

        eecs485_p3_insta485_client_event = Events(
            title="Web Systems (EECS 485): Client-side Dynamic Pages",
            desc="""Developed a client-side dynamic web application inspired by Instagram, utilizing React for the frontend and Flask for the backend. Implemented REST API endpoints in Flask to handle data retrieval and updates, with the React client making asynchronous calls to keep the site content updated. Incorporated interactive features such as double-click to like and infinite scroll for enhanced user experience. This project highlights skills in full-stack web development, RESTful API design, and modern client-side interactivity.""",
            tags=["Projects", "Academics"],
            start=date(2024, 9, 23),
            end=date(2024, 10, 2),
            images=[]
        )

        eecs485_p4_mapreduce_event = Events(
            title="Web Systems (EECS 485): MapReduce",
            desc="""Designed and implemented a distributed word frequency counter using the MapReduce framework, with parallel processing across multiple machines. Architected a system with a single manager process and multiple worker processes, communicating via TCP for task distribution and UDP for heartbeat monitoring. Employed round-robin job allocation, where the manager partitions a large file and assigns mapping tasks to workers, redistributing intermediate data for reduction upon completion. Incorporated fault tolerance by reassigning unfinished tasks from failed workers, as detected through periodic heartbeats. This project strengthened skills in distributed systems, parallel computing, fault tolerance, and network programming.""",
            tags=["Projects", "Academics"],
            start=date(2024, 10, 23),
            end=date(2024, 11, 7),
            images=[]
        )

        eecs485_p5_search_engine_event = Events(
            title="Web Systems (EECS 485): Search Engine",
            desc="""Developed a search engine that ranks and displays the most relevant websites in response to user queries, utilizing tf-idf and PageRank algorithms. Implemented a web crawler to scrape and index content from multiple files, leveraging a distributed MapReduce framework to efficiently compute term frequency-inverse document frequency (tf-idf) values. During query processing, calculated document relevance by combining PageRank scores with cosine similarity between query and document tf-idf vectors, and presented results sorted by overall score with pagination for user-friendly navigation. This project reinforced expertise in information retrieval, distributed computing, and applied algorithm design.""",
            tags=["Projects", "Academics"],
            start=date(2024, 11, 15),
            end=date(2024, 12, 30),
            images=[]
        )

        eecs482_p1_monitor_event = Events(
            title="Introduction to Operating Systems (EECS 482): Multi-threaded Programming",
            desc="""Implemented a concurrent pizza delivery simulation using mutexes, condition variables, and monitors to coordinate multiple clients and drivers for maximum concurrency and correctness. Modeled clients placing orders from various coordinates and drivers accepting deliveries only when they are mutually closest to a client, ensuring exclusive assignment. Managed delivery lifecycle including driver travel, payment exchange, and readiness for new orders, while preventing race conditions such as double assignment of clients or premature advancement of drivers. This project enhanced proficiency in concurrent programming, resource synchronization, and managing complex interactions in multi-threaded environments.""",
            tags=["Projects", "Academics"],
            start=date(2025, 1, 29),
            end=date(2025, 2, 14),
            images=[]
        )

        eecs482_p2_thread_event = Events(
            title="Intro to Operating Systems (EECS 482): Thread Library",
            desc="""Designed and implemented a custom thread library supporting advanced multithreading features, including thread management, mutexes, condition variables, and multi-CPU support. Developed thread class functionality such as join and yield, mutex class operations like lock and unlock, and condition variable methods including wait, signal, and broadcast. Engineered a CPU class to simulate multiple CPU cores, handling timer and inter-processor interrupts to enable preemptive context switching and increase concurrency. Utilized CPU guards and RAII principles to ensure safe and efficient execution, preventing deadlocks and ensuring proper memory cleanup. This project strengthened expertise in concurrent programming, synchronization techniques, and systems-level design.""",
            tags=["Projects", "Academics"],
            start=date(2025, 2, 25),
            end=date(2025, 3, 12),
            images=[]
        )

        eecs482_p3_pager_event = Events(
            title="Intro to Operating Systems (EECS 482): Pager",
            desc="""Developed a virtual memory pager to manage address spaces for parent and child processes, simulating data movement between disk and physical memory for both swap-backed and file-backed pages. Implemented memory management features including shared file-backed pages, process-independent swap-backed pages, and dynamic sharing of swap space when data is identical among processes, with copy-on-write on modification. Managed page permissions using read/write bits, tracked page states with dirty and referenced bits, and employed the clock page replacement algorithm for efficient memory eviction. Supported key virtual memory operations such as mapping, yielding, context switching, forking, and destruction of address spaces. This project enhanced understanding of virtual memory, process isolation, and efficient resource management in operating systems.""",
            tags=["Projects", "Academics"],
            start=date(2025, 3, 26),
            end=date(2025, 4, 9),
            images=[]
        )

        eecs482_p4_file_system_event = Events(
            title="Intro to Operating Systems (EECS 482): Network File System",
            desc="""Designed and implemented a network file system enabling processes to perform read, write, create, and delete operations on files and directories via socket-based client-server communication. Supported concurrent access from multiple processes using reader-writer and upgradable locks to ensure data correctness and consistency. Modeled directory structures with access control, allowing only the owner to manipulate non-root directories and files, while maintaining universal access to the root directory. Simulated slow disk I/O for file operations and incorporated robust error handling to validate and execute requests reliably. On server initialization, implemented a system walk to reconstruct the file hierarchy from existing inodes when provided. This project strengthened proficiency in distributed systems, concurrency control, file system architecture, and network programming.""",
            tags=["Projects", "Academics"],
            start=date(2025, 4, 26),
            end=date(2025, 5, 7),
            images=[]
        )

        research_summer = Events(
            title="Urban Greenhouse Summer Research",
            desc="Collaborated with Professor Ron Eglash to design and prototype affordable Arduino-based hardware for Detroit’s minority-owned urban farms and fabrication shops. I developed and tested real-time systems integrating sensors, servos, and durable, weather-resistant components—most notably a greenhouse ventilation system capable of responding to temperature changes within two seconds and completing full shutter motion in under ten. Built for under $100 and designed for accessibility, these solutions emphasized sustainability and community empowerment, aligning technical innovation with social justice and the broader goals of generative justice.",
            tags=["Research", "Academics", "Professional"],
            start=date(2023, 5, 1),
            end=date(2023, 8, 15),
            images=["/events/greenhouse/greenhouse1.jpg", "/events/greenhouse/greenhouse2.jpg", "/events/greenhouse/greenhouse3.jpg", "/events/greenhouse/greenhouse4.jpg", "/events/greenhouse/greenhouse5.jpg"]
        )

        shanghai_study_abroad = Events(
            title="Study Abroad in Shanghai, China",
            desc="Studied abroad at the Shanghai Jiao Tong University (SJTU) in Shanghai, China, immersing myself in a new culture while continuing my computer science education. Completed courses in Dynamics and Vibration (ME 240 Equivalent), Artificial Inelligence (EECS 392 Equivalent), and a Chinese Culture class.",
            tags=["Personal", "Academics"],
            start=date(2024, 5, 1),
            end=date(2024, 8, 15),
            images=["/events/shanghai/shanghai1.jpg", "/events/shanghai/shanghai2.jpg", "/events/shanghai/shanghai3.jpg", "/events/shanghai/shanghai4.jpg", "/events/shanghai/shanghai5.jpg"]
        )

        kdp_internship = Events(
            title="IT Prompt Engineering Intern at Keurig Dr Pepper (KDP)",
            desc="Piloted automated shelf image analysis using GenAI and computer vision to detect product voids and prevent potential revenue loss, with current testing focused on optimizing image resolution and model accuracy. I also designed and began piloting an operator-support chatbot for the Allentown plant, targeting a 20% reduction in troubleshooting downtime and an estimated $300K in annual revenue growth through OEE improvements. In parallel, I collaborated with Google, Microsoft, and internal teams to assess open-source and multimodal AI tools, incorporating user feedback and technical constraints to refine adoption strategies. I regularly delivered interim findings and live technical demonstrations to business leaders, shaping the future roadmap for AI integration in manufacturing and retail operations.", 
            tags=["Professional"],
            start=date(2025, 6, 1),
            end=date(2025, 8, 15),
            images=["/events/kdp/kdp1.jpg", "/events/kdp/kdp2.jpg", "/events/kdp/kdp3.jpg", "/events/kdp/kdp4.jpg", "/events/kdp/kdp5.jpg"]
        )

        japan_trip = Events(
            title="Japan Trip 2025",
            desc="Traveling to Japan for 2 weeks in with friends to explore the culture, food, and sights of Tokyo, Kyoto, Osaka, and Hiroshima.",
            tags=["Personal"],
            start=date(2025, 5, 1),
            end=date(2025, 5, 15),
            images=["/events/japan2025/japan1.jpg", "/events/japan2025/japan2.jpg", "/events/japan2025/japan3.jpg", "/events/japan2025/japan4.jpg", "/events/japan2025/japan5.jpg", "/events/japan2025/japan6.jpg", "/events/japan2025/japan7.jpg", "/events/japan2025/japan8.jpg", "/events/japan2025/japan9.jpg"]
        )

        db.session.add_all([
            tictactoe_event,
            recipEats_app_event,
            eecs280_p2_cv_event,
            eecs280_p3_euchre_event,
            eecs280_p5_ml_event,
            eecs281_p1_back_to_the_ship_event,
            eecs281_p2_a_new_heap_event,
            eecs281_p3_sillyql_event,
            eecs281_p4_pokemon_event,
            eecs370_p1_asm_event,
            eecs370_p2_al_event,
            eecs370_p3_pipeline_event,
            eecs370_p4_cache_event,
            eecs485_p1_insta485_statuc_event,
            eecs485_p2_insta485_server_event,
            eecs485_p3_insta485_client_event,
            eecs485_p4_mapreduce_event,
            eecs485_p5_search_engine_event,
            eecs482_p1_monitor_event,
            eecs482_p2_thread_event,
            eecs482_p3_pager_event,
            eecs482_p4_file_system_event,
            research_summer, 
            shanghai_study_abroad,
            kdp_internship,
            japan_trip
        ])
        db.session.commit()                                            # Commit changes to documents table
        print("Database created and populated.")

def create_app():
    app = Flask(__name__)                                                       # Initialize Flask Object
    CORS(app)                                                                   # Allow cross-origin requests (client and server has different ports)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_FILENAME                   # Configure database and its location. Here it indicates sqlite as the database and site.db relative to this path via ///
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False                        # Disables SQLAlechemy's event tracking that emits signal for changes in the db
    db.init_app(app)                                                            # Binds the SQLAlechemy to the Flask Object

    with app.app_context():                                                     # Descriptor to access Flask obect (the database here)                            
        db.drop_all()                                                           # Drop all tables in the database
        db.create_all()                                                         # Create all tables in the database
    hardcode_projects_database(app)                                             # Code to reset projects database (TODO: binarize this later)
    hardcode_documents_database(app)                                            # Code to reset documents database (TODO: binarize this later)
    hardcode_timeline_database(app)                                             # Code to reset coduments database (TODO: binarize this later)

    # Register Blueprints       
    from .routes import projects_bp, documents_bp, timeline_bp                  # Import blueprint for projects route
    app.register_blueprint(projects_bp)                                         # Access the projects route
    app.register_blueprint(documents_bp)                                        # Access the documents route
    app.register_blueprint(timeline_bp)                                         # Access the timeline route

    return app                                                                  # Return app
