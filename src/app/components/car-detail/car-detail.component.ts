import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/car-image/car-image';
import { Car } from 'src/app/models/car/car';
import { Rental } from 'src/app/models/rental/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car/car.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  carId: number;
  carImages: CarImage[];
  imageUrl: string = 'https://localhost:44324/';
  closeResult = '';
  rentDate: Date;
  returnDate: Date;
  rentals: Rental[]= [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private carImageService: CarImageService,
    private rentalService:RentalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
        this.getCarImagesByCarId(params['carId']);
        this.getRentals(params['carId']);
      }
    });
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
     this.car = response.data[0];
      console.log(response.data);
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      //console.log(response);
    });
  }


  getBack() {
    this.carService.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.car = response.data[0];
    });
  }

 getRentals(carId: number) {
  this.rentalService.getRentals().subscribe(response=>{
    this.rentals = response.data
  })
}

}
