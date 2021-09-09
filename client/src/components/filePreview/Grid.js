export const Grid = ({files}) => {
    if(!files.length){
        return null
    };

    return files.map((file) => <img style={{maxWidth: '200px'}} src={`//localhost:3001/${file}`} alt={file.originalname}/>);
}