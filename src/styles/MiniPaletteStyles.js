export default {
    root: {
        backgroundColor: 'white',
        border: '0px solid black',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        "&:hover > div": {
            opacity: '1',
        }
    },
    colors: {
        backgroundColor: '#dae1e4',
        height: '150px',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        fontSize: '1rem',
        position: 'relative'
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        verticalAlign: 'bottom'
    },
    delete: {
        color: 'white',
        backgroundColor: "#eb3d30",
        width: "20px",
        height: "20px",
        position: "absolute",
        right: "0px",
        top: "0px",
        padding: "10px",
        zIndex: '10',
        opacity: '0',
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
};