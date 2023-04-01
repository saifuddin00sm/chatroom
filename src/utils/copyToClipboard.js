import {toast} from 'react-toastify';

function copyToClipboard(text) {
    const tempElement = document.createElement("textarea");
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    tempElement.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempElement);
    toast.success('Copied to clipboard', {
      position: "top-center",
      // theme: "colored",
      autoClose: 500,
    });
  }


  export default copyToClipboard;