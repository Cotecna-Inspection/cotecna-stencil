export function postMultipartFormData(url: string, formData: FormData): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('POST', url);
    request.send(formData);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        request.status == 200 
          ? resolve(request.response) 
          : reject(request.status);
      }
    }
  });
}