const input = document.getElementById('pdf-input');

input.addEventListener('change', (event) => {
  const files = event.target.files; // FileList con los PDFs elegidos
  
  for (const file of files) {
    handlePDF(file);
  }
});

function handlePDF(file) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const typedArray = new Uint8Array(e.target.result);
    console.log('PDF leído como bytes:', typedArray);
    // Aquí en el siguiente paso lo pasamos a PDF.js
  };

  reader.readAsArrayBuffer(file);
}

function handlePDF(file) {
  const reader = new FileReader();

  reader.onload = async (e) => {
    const typedArray = new Uint8Array(e.target.result);
    const coverImage = await generarPortada(typedArray);
    console.log(coverImage); // por ahora, solo mira el resultado
  };

  reader.readAsArrayBuffer(file);
}

async function generarPortada(pdfData) {
  const pdf = await pdfjsLib.getDocument(pdfData).promise;
  const page = await pdf.getPage(1);

  const scale = 0.5;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: context, viewport }).promise;

  return canvas.toDataURL(); // la portada como imagen
}