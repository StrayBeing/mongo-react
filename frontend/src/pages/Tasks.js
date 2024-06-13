import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/style.css';

const Tasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [sortBy, setSortBy] = useState('createdAt'); // Domyślne sortowanie po dacie
    const [showCompleted, setShowCompleted] = useState(false); // Pokazuj tylko nieukończone zadania

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user, sortBy, showCompleted]); 

    const fetchTasks = async () => {
        try {
            let url = `http://localhost:5000/api/tasks?sortBy=${sortBy}`;
            if (!showCompleted) {
                url += '&status=pending';
            }

            const response = await axios.get(url);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            fetchTasks(); 
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                { status }
            );
            fetchTasks(); 
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:5000/api/tasks',
                {
                    title: newTaskTitle,
                    description: newTaskDescription,
                    status: 'pending', 
                    createdBy: user.username, 
                }
            );
            setNewTaskTitle('');
            setNewTaskDescription('');
            fetchTasks(); 
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') {
            setNewTaskTitle(value);
        } else if (name === 'description') {
            setNewTaskDescription(value);
        }
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleToggleCompleted = () => {
        setShowCompleted(!showCompleted);
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="main-content">
                {user && (
                    <>
                        <h1>Welcome, {user.username}</h1>

                        {}
                        <form className="form" onSubmit={handleAddTask}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newTaskTitle}
                                onChange={handleChange}
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={newTaskDescription}
                                onChange={handleChange}
                            ></textarea>
                            <button type="submit">Add Task</button>
                        </form>

                        {}
                        <div className="filter-options">
                            <button onClick={handleToggleCompleted}>
                                {showCompleted ? 'Show All' : 'Show Incomplete'}
                            </button>

                            <select value={sortBy} onChange={handleSortChange}>
                                <option value="createdAt">Sort by Date</option>
                                <option value="title">Sort by Title</option>
                                <option value="createdBy">Sort by User</option>
                                <option value="status">Sort by Status</option> {}
                            </select>
                        </div>

                        {}
                        <div className="notes-container">
                            {tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className={`note ${task.status}`} 
                                >
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <p>Created by: {task.createdBy}</p> {}
                                    <p>Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
                                    {task.status === 'completed' ? (
                                        <p>Status: Completed</p>
                                    ) : (
                                        <button onClick={() => handleToggleStatus(task._id, 'completed')}>Complete</button>
                                    )}
                                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <footer className="footer">
                <p>20480 Sobierajski Maciej</p>
            </footer>
        </div>
    );
};

export default Tasks;
