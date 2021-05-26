import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AppService {
  httpHeaders = new HttpHeaders();
  categoryCount = 0;

  constructor(private httpClient: HttpClient) {
    this.httpHeaders.append("Content-Type", "application/json");
  }
  create(path, data) {
    return this.httpClient
      .post("http://localhost:3000/" + path + "/", data, {
        headers: this.httpHeaders
      })
      .toPromise()
      .then((response: any) => response);
  }
  update(path, id, data) {
    return this.httpClient
      .put("http://localhost:3000/" + path + "/" + id, data, {
        headers: this.httpHeaders
      })
      .toPromise()
      .then((response: any) => response);
  }
  get(path, id) {
    return this.httpClient
      .get("http://localhost:3000/" + path + "/" + id, {
        headers: this.httpHeaders
      })
      .toPromise()
      .then((response: any) => response);
  }
  getAll(path) {
    return this.httpClient
      .get("http://localhost:3000/" + path + "/", { headers: this.httpHeaders })
      .toPromise()
      .then((response: any) => response);
  }
  delete(path, id) {
    return this.httpClient
      .delete("http://localhost:3000/" + path + "/" + id)
      .toPromise()
      .then((response: any) => response);
  }
}
