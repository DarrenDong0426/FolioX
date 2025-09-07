from datetime import date
from flask import Flask
from flask_cors import CORS
from config import DATABASE_FILENAME                                        # Imports Flask
from .models import db, Projects, Documents                                 # Imports database and schemas from models
from datetime import date                                                   # Import data format from datetime

# Function to hardcode the project database 
def hardcode_projects_database(app):   
    with app.app_context():                                                 # Descriptor to access Flask obect (the database here)                            
        Projects.query.delete()                                             # Delete all rows in Projects table

        # Hardcode project rows
        tictactoe = Projects(name="TictacToe", desc="""A standard Tic-Tac-Toe game where an user can choose between playing a computer or a second user.
                                                    An GUI is implemented to show the Tic-Tac-Toe board and gameplay rather than using print outs in the terminal. 
                                                    This project involved personal research in understanding and implementing minimax algorithm to create an AI Tic-tac-Toe agent that selects the best move everytime (results in a tie), despite the assignment not requiring so.
                                                    As an aside, researched was also done in alpha-beta pruning algorithm though it was not implemented as high school me did not understand it at the time (I do now), and Tic-Tac-Toe would not need to require such optimizations.""", 
                            lock=False, wip=False, month_year=date(2021, 5, 14), language=["Java"], type=["Software"])
        recipEats_app = Projects(name="RecipEats", desc="""Final project for an App Development class in High School that enables users to post and search for any recipes. The app allows users to create an account or log into an existing one (without hashing) and interact with other users.
                                                    Users can post its own recipe or search up and like other posts from other users. Additionally, users can edits its own account and see and edit its own posts. 
                                                    Each recipe features the name, the summary, the prep time, the serving size, the ingredients, the tools, the calories, the allergens, and the cost. Firebase is used as the database for any user information.
                                                    A dynamic loading screen is also implemented while database retrieval is performed.""",
                            lock=False, wip=False, month_year=date(2022, 6, 6), language=["Dart"], type=["Software"])
        eecs280_p2_cv = Projects(name="Programming and Intro Data Structures (EECS 280): Image Processing", desc="""Basic image processing functions such as calculating energy matrix, cost matrix, and applying seam carving algorithm. 
                                                                                                                The goal behind this project was to get experience in using strings, IO, C++ pointers, and structs. 
                                                                                                                Application wise, the project is able to resize images to a smaller resolution by removing the least important seams at a time. """,
                                lock=True, wip=False, month_year=date(2022, 9, 29), language=["C++"], type=["Software"])
        eecs280_p3_euchre = Projects(name="Programming and Intro Data Structures (EECS 280): Euchre", desc="""Euchre game simulation supporting a simple "AI" player and a human-controlled player that reads moves from an input file. 
                                                                                                                The projects involves using Abstract Data Types in C++, Inheritance, and Polymorphism.""",
                                    lock=True, wip=False, month_year=date(2022, 10, 19), language=["C++"], type=["Software"])
        eecs280_p5_ml = Projects(name="Programming and Intro Data Structures (EECS 280): Machine Learning", desc="""Piazza label classifier using bag of word model of a post. 
                                                                                                                The classification method is using bayesian probability to calculate the log probability of each label given the bag of words model of a post.""",
                                lock=True, wip=False, month_year=date(2022, 11, 18), language=["C++"], type=["Software", "AI/ML"])
        eecs281_p1_back_to_the_ship = Projects(name="Data Structures and Algorithms (EECS 281): Back to the Ship!", desc="""Path finding algorithm from a given location to an exit of a 3D maze using Breadth-Fist Search and Depth-First Search. 
                                                                                                                        The scenario is a space station composed of ten levels. An agent can only move horitonally and vertically on a 2d grid and move to another level through the elevator at that level, which brings the agent to the same coordinate at adjacent levels.""",
                                        lock=True, wip=False, month_year=date(2023, 1, 13), language=["C++"], type=["Software"])
        eecs281_p2_a_new_heap = Projects(name="Data Structures and Algorithms (EECS 281): Star Wars: Episode X - A New Heap", desc="""Event-driven simulation of conflict-resolution system using priority queues and a running median algorithm. 
                                                                                                                                    The scenario is a Star Wars battle where Jedi and Sith are deployed onto multiple planet. 
                                                                                                                                    Under certain constraints, a battle between a Jedi or Sith can occur, which changes the state of a deployment or planet. 
                                                                                                                                    A metric known as the Force-Sensitivity is used to determine priority of battles. 
                                                                                                                                    This battlefield scenario can be adopted to a stock market to simulate buyers and sellers.""",
                                    lock=True, wip=False, month_year=date(2023, 2, 8), language=["C++"], type=["Software"])
        eecs281_p3_sillyql = Projects(name="Data Structures and Algorithms (EECS 281): SillyQL", desc="""Basic relational database implementation with an interface based on a subset of a standard query language.
                                                                                                    Database commands include Create, Remove, Insert, Join, Delete, and Generate using a hashmap""", 
                                lock=True, wip=False, month_year=date(2023, 3, 29), language=["C++"], type=["Software"])
        eecs281_p4_pokemon = Projects(name="Data Structures and Algorithms (EECS 281): Pokemon", desc="""Focuses on calculating minimum spanning tree and using it to approximate and solve the Traveling Salesperson Problem. 
                                                                                                    The scenario is a pokemon trainer who has to fight different trainer and then catch every pokemon. 
                                                                                                    Part A consists of a graph where nodes are pokemon location and Prim or Kruskal's Algorithm must be implemented to determine the minimum length of connections needed.
                                                                                                    Part B approximate the Traveling Salesperson problem by having a trainer find an apprixmate path that reaches every pokemon in a graph and returning back to starting coordinate through hueristics. 
                                                                                                    Part C implements a branch and bounds algorithm that would calculate the most optimal path for the Traveling Salesperson problem.""", 
                                lock=True, wip=False, month_year=date(2023, 4, 7), language=["C++"], type=["Software"])
        eecs370_p1_asm = Projects(name="Intro to Computer Organization (EECS 370): Assembler, Simulator, and Multiplication", desc="""Low-level assembler and simulator of a input file. Part A is an assembler that takes in assembly-language file and create a file representing the machine code.
                                                                                                                                Part B is a simulator that prints out the register states after every instruction is executed where the instruction is in the form of machine code.
                                                                                                                                Part C is implementing multiplication of two numbers using repetitive addition using assembly language.""", 
                            lock=True, wip=False, month_year=date(2023, 9, 11), language=["C"], type=["Software"])
        eecs370_p2_al = Projects(name="Intro to Computer Organization (EECS 370): Assembler and Linker", desc="""Low-level assembler and linker of a input file. Part A is an assembler that takes in assembly0level file and create a object file that contains a header, a symbol table, and a relocation table.
                                                                                                            Part B is a linker that takes in multiple object files and returns a single machine code file.""", 
                            lock=True, wip=False, month_year=date(2023, 9, 28), language=["C"], type=["Software"])
        eecs370_p3_pipeline = Projects(name="Intro to Computer Organization (EECS 370): Multi-cycle Pipeline", desc="""Multi-cycle pipeline of L2-CK instructions with data forwarding and simple branch predictions. Given an assembly-language file, after each cycle, the register states are printed out.
                                                                                                            Control and data hazards are done using data forwarding, stalling, and squashing.""",
                            lock=True, wip=False, month_year=date(2023, 10, 23), language=["C"], type=["Software"])
        eecs370_p4_cache = Projects(name="Intro to Computer Organization (EECS 370): Cache", desc="""Simulates movement between cache, processor, and memory. The cache is set-associative with a write-back and least recently used eviction policy.
                                                                                                Arguments include the block size in words (4 bytes), numbers of sets, and the number of blocks per set. """,
                            lock=True, wip=False, month_year=date(2023, 11, 16), language=["C"], type=["Software"])
        eecs485_p1_insta485_statuc = Projects(name="Web Systems (EECS 485): Templated Static Site Generator", desc="""Templated website of instagram without much UI design. A general framework of an Instagram home page and a user's page. Multiple pages are generated by passing in values through a json file and using jinjas to render templated pages.""", 
                                        lock=True, wip=False, month_year=date(2024, 9, 5), language=["HTML", "Python", "Shell"], type=["Software"])
        eecs485_p2_insta485_server = Projects(name="Web Systems (EECS 485): Server-side Dynamic Pages", desc="""Server-side dynamic page of instagram without much UI design using Flask as the backend. A basic sqlite database is used to maintain information and routing is done with Flask. 
                                                                                                            Pages are generated using api calls to the server and generated using templated pages.""", 
                                        lock=True, wip=False, month_year=date(2024, 9, 18), language=["HTML", "Python", "Shell"], type=["Software"])
        eecs485_p3_insta485_client = Projects(name="Web Systems (EECS 485): Client-side Dynamic Pages", desc="""Client-side dynamic page of instagram without much UI design using Flask as the backend and React as the frontend. REST API calls are implemented in the backend with Flask and are called by the client to update the site. 
                                                                                                            Other client-side React functionalities include double click to like and infinite scroll.""", 
                                        lock=True, wip=False, month_year=date(2024, 10, 2), language=["HTML", "Python", "Shell", "JavaScript"], type=["Software"])
        eecs485_p4_mapreduce = Projects(name="Web Systems (EECS 485): MapReduce", desc="""Computes the frequency of each word in a file using the MapReduce framework, leveraging multiple processes and threads that communicate over a network. A single manager process and multiple worker processes are created. Manager distribute a job to worker processes using round robin.
                                                                                    The manager assigns the large file to workers to be mapped into temporary directories. The mapped files are then redistributed to worker processes for the reduce step after all mapping is done. Heartbeats are sent from worker to manager to indicate if a worker is alive. 
                                                                                    For fault tolerance, if a worker dies while on a task, the task is given to another worker. Tasks are communicated between manager and worker processes through TCP protocol while heartbeats are sent from worker to the manager via UDP protocol.""", 
                                lock=True, wip=False, month_year=date(2024, 10, 23), language=["Python", "Shell"], type=["Software"])
        eecs485_p5_search_engine = Projects(name="Web Systems (EECS 485): Search Engine", desc="""A search engine that shows the most relevant sites given a user query using tf-idf and PageRank. A crawler program webscrape a directory for words from multiple files to compute the tf-idf of each word via a distributed mapreduce framework. 
                                                                                            At query time, the score calculated using PageRank and cosine similairty between the tf-idf of the query and each document. The result are sorted based on this score with pagination. """, 
                                        lock=True, wip=False, month_year=date(2024, 11, 15), language=["Python", "Shell", "HTML", "CSS"], type=["Software"])
        eecs482_p1_monitor = Projects(name="Introduction to Operating Systems (EECS 482): Multi-threaded Programming", desc="""Basic monitor programming for a pizza delivery between clients and drivers using mutexes and conditional variables for maximum concurrency. The scenario is clients who order pizza from a coordinate and drivers, initialize at origin, who must deliver to clients.
                                                                                                                        In order for a driver to accept a client, the driver and client must be mutually the closest. After accepting delivery, the driver must drive to the client, await for payment, and wait for next client and continue. 
                                                                                                                        Meanwhile, the client must wait for pizza to be delivered before requesting more pizza. Driving takes a long time. In order to maximize concurrency, other drivers should be able to accept deliveries from other non-accepted clients. 
                                                                                                                        The program must also be correct in that no client should have two drivers at any time and drivers can only proceed with next client when it recieves payment from current client. """,
                                lock=True, wip=False, month_year=date(2025, 1, 29), language=["C++"], type=["Software"])
        eecs482_p2_thread = Projects(name="Intro to Operating Systems (EECS 482): Thread Library", desc="""Features of a thread library such as the thread class, the mutex class, the conditional variable class, and cpu class for multiple cpu cores. Functions within the thread. 
                                                                                                    Functions within the thread class includes join and yield. Functions within the mutex class includes the lock and unlock. Functions within the conditional variable class include wait, signal, and broadcast.
                                                                                                    Functions within the cpu class includes timerInterruptHanlder and ipiInterruptHandler. Multiple cpus are implemented safely and efficiently to ensure threads are executed correctly without deadlock. 
                                                                                                    Interrupts are used to force in preemptive context switching for more concurrency. CPU guards and RAII are used to ensure no CPU are executing the same thread at the same time and memory are cleaned up after a thread finishes.""",
                                lock=True, wip=False, month_year=date(2025, 2, 25), language=["C++"], type=["Software"])
        eecs482_p3_pager = Projects(name="Intro to Operating Systems (EECS 482): Pager", desc="""A pager that manage virtual address spaces for parent and child processes. The program simulates movement of data between disk and physical memory for both swap-backed and file-backed pages. 
                                                                                            File-backed pages are shared while swap-backed pages are independent to a process. The permission bit for a page is maintained through read and write bits on the page table. States of a page is indicated through dirty and referenced bits. 
                                                                                            To minimize disk movement and memory, swap-backed pages are shared if data is the same among multiple processes and are allocated its own when a write occurs. The eviction algorithm used to move from physical memory is clock page replacement algorithm.
                                                                                            The pager should support functions such as vm_map, vm_yield, vm_switch, vm_destroy and forking from an existing process.""", 
                            lock=True, wip=False, month_year=date(2025, 3, 26), language=["C++"], type=["Software"])
        eecs482_p4_file_system = Projects(name="Intro to Operating Systems (EECS 482): Network File System", desc="""A network file system with processes requesting read, write, create, and deleting operations on a file. Multiple processes are able to send requests to the server process using socket programming. 
                                                                                                                    Files can only be read and write to through slow disk reads and disk writes. Directories and files can only be destroyed or created under another directory. The root directory, set at inode 0, is accessible by everyone while other directories and files can only be accessed by the owner (the creator). 
                                                                                                                    On initialization prior to receiving request, the server process does a walk to check for existing file system which can be passed in as input to initialize existing inodes. 
                                                                                                                    Reader and writer locks are used to maintain concurrency such that every request results in correctness and consistency. Upgradable locks are further used to manage even more concurrency.
                                                                                                                    Processes can send requests via socket programming with requests. Error handling is performed such that the request passed in must be valid and the request can be performed as expected.""", 
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

        AI_ML_Resume = Documents(title="AI/ML Resume", desc="A resume tailored to positions related to artificial intelligence and machine learning. Items on this document will reference projects and experiences focusing more on using and developing models and less on system design.", last_updated=date.today())
        Embedded_Resume = Documents(title="Embedded Systems Resume", desc="A resume tailored to positions related to hardware and embedded systems. Items on this document will reference projects and experiencees that involves hardawre components, circuits, and programming on embedded software.", last_updated=date.today())
        Software_Resume = Documents(title="Software Engineering Resume", desc="A resume tailored to positions related to software engineering. Items on this document will reference projects and experiences that involves heavier programming skills such as using data structures, developing algorithms, and scalaibility. ", last_updated=date.today())
        Transcript = Documents(title="Transcript", desc="Transcript from the University of Michigan, outlining classes transferred and taken as an undergraduate students. The documents holds the timeline of classes as well as the grade and semester taken for each class.", last_updated=date.today())

        db.session.add_all([
            AI_ML_Resume, 
            Embedded_Resume,
            Software_Resume, 
            Transcript
        ])
        db.session.commit()                                            # Commit changes to documents table
        print("Database created and populated.")


def create_app():
    app = Flask(__name__)                                                       # Initialize Flask Object
    CORS(app)                                                                   # Allow cross-origin requests (client and server has different ports)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_FILENAME                   # Configure database and its location. Here it indicates sqlite as the database and site.db relative to this path via ///
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False                        # Disables SQLAlechemy's event tracking that emits signal for changes in the db
    db.init_app(app)                                                            # Binds the SQLAlechemy to the Flask Object

    with app.app_context():
        db.create_all()
    # hardcode_projects_database(app)                                           # Code to reset database (TODO: binarize this later)
    # hardcode_documents_database(app)

    # Register Blueprints       
    from .routes import projects_bp, documents_bp                               # Import blueprint for projects route
    app.register_blueprint(projects_bp)                                         # Access the projects route
    app.register_blueprint(documents_bp)                                         # Access the documents route

    return app                                                                  # Return app
