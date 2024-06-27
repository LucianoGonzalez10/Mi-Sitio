document.getElementById('downloadButton').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'Archivos\\Luciano-gonzalez-Marangoni-CV.pdf'; 
    link.download = 'Luciano-Gonzalez-CV.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
