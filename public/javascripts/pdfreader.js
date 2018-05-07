PDFJS.workerSrc = '/javascripts/pdf_js/pdf.worker.js';

function run(url_, page_num_, id_){
  var pdfDoc = null,
      pageNum = page_num_,
      pageRendering = false,
      pageNumPending = null,
      scale = 1.1,
      canvas = document.getElementById(id_),
      // ctx = canvas.getContext('2d');
      url = url_;

  /**
   * Get page info from document, resize canvas accordingly, and render page.
   * @param num Page number.
   */
  function renderPage(num) {
    pageRendering = true;
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function(page) {
      var viewport = page.getViewport(scale);
      // canvas = document.getElementById('2016'),
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      ctx = canvas.getContext('2d');

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);

      // Wait for rendering to finish
      renderTask.promise.then(function () {
        pageRendering = false;
        if (pageNumPending !== null) {
          // New page rendering is pending
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      });
    });

    // Update page counters
    // document.getElementById('page_num').textContent = pageNum;
  }

  /**
   * If another page rendering in progress, waits until the rendering is
   * finished. Otherwise, executes rendering immediately.
   */
  function queueRenderPage(num) {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      renderPage(num);
    }
  }

  /**
   * Asynchronously downloads PDF.
   */
  PDFJS.getDocument(url).then(function (pdfDoc_) {
    pdfDoc = pdfDoc_;
    // document.getElementById('page_count').textContent = pdfDoc.numPages;

    // Initial/first page rendering
    renderPage(pageNum);
  });
}
// run('/pdfs/ism_exam_2016.pdf', 2);
