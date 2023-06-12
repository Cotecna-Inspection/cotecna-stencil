export function postMultipartFormData(url: string, formData: FormData): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Authorization', 'cotecnaAIObjectCounter:ded41b3c-8a1e-4296-b7fa-542850c44909');
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