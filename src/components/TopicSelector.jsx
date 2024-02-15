// NOT IN USE, NOT REALLY NEEDED FOR THE PROJECT

function TopicSelector ({lang_id}) {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetchTopics();
    }, [lang_id])

    async function fetchTopics() {  
        const response = await fetch(`http://localhost:8000/api/topics?language_id=${lang_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        setTopics(result.data);    
    }
    return (
            <select>
            {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>{topic.name}</option>
            ))}
            </select>
    );
}
export default TopicSelector;