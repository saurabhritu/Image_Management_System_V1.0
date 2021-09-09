export const Preview = ({files}) => {
    if(!files.length){
        return null
    };

    return files.map((file) => <img style={{maxWidth: '100px'}} src={`//localhost:3001/${file.filename}`} alt={file.originalname}/>);
}