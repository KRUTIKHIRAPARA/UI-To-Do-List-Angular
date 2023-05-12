import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CrudService } from './crud.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('CrudService', () => {
  let service: CrudService;
  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        HttpClientTestingModule 
       ]
    });
    service = TestBed.inject(CrudService);
    httpMock = TestBed.get(HttpTestingController);

  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


