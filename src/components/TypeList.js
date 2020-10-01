import React from 'react';
import moment from 'moment';
import axios from 'axios';


function TaskList(props) {
    const [tasks, setTasks] = useState([]);

    //Para hacer GET ALL. Usamos axios (GET all) para obtener los tipos del backend.
    const getTasks = () => {
        // axios.get('ws/rest/tasks/paginated', { params: { pageSize: 2, first: 0 }})
        axios.get('ws/rest/types')
            .then(res => {
                setTasks(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    //La lista debe permitirnos: editar un tipo, borrar un tipo y agregar un nuevo tipo.

    useEffect(() => {
        getTasks();
    }, [])

    //Para hacer DELETE. Usamos axios (DELETE) para eliminar un tipo desde la tabla.
    const deleteTask = id => {
        axios.delete(`/ws/rest/types/${id}`)
            .then(res => {
                alert(`Tarea con ID: ${id} borrada correctamente`);
                getTasks();
            })
            .catch(err => {
                console.log(err);
            });
    };

}
export default TypeList;
