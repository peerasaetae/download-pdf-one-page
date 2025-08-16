import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

Chart.register(...registerables);

@Component({
    selector: 'app-pdf-export',
    standalone: true,
    templateUrl: './pdf-export.component.html',
    styleUrls: ['./pdf-export.component.css']
})
export class PdfExportComponent implements AfterViewInit {
    @ViewChild('lineChartCanvas', { static: false }) lineChartCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('barChartCanvas', { static: false }) barChartCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart3Canvas', { static: false }) chart3Canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart4Canvas', { static: false }) chart4Canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart5Canvas', { static: false }) chart5Canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart6Canvas', { static: false }) chart6Canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart7Canvas', { static: false }) chart7Canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart8Canvas', { static: false }) chart8Canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart9Canvas', { static: false }) chart9Canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chart10Canvas', { static: false }) chart10Canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('exportContainer', { static: false }) exportContainer!: ElementRef<HTMLDivElement>;

    lineChart: Chart | undefined;
    barChart: Chart | undefined;
    chart3: Chart | undefined;
    chart4: Chart | undefined;
    chart5: Chart | undefined;
    chart6: Chart | undefined;
    chart7: Chart | undefined;
    chart8: Chart | undefined;
    chart9: Chart | undefined;
    chart10: Chart | undefined;

    // Sample data for charts
    chartData = {
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน'],
        datasets: [{
            label: 'ยอดขาย (บาท)',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: true
        }]
    };

    barChartData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
            label: 'รายได้ (ล้านบาท)',
            data: [45, 52, 48, 61],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    };

    chart3Data = {
        labels: ['สินค้า A', 'สินค้า B', 'สินค้า C', 'สินค้า D', 'สินค้า E'],
        datasets: [{
            label: 'ยอดขาย (หน่วย)',
            data: [120, 190, 300, 500, 200],
            backgroundColor: 'rgba(153, 102, 255, 0.8)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2
        }]
    };

    chart4Data = {
        labels: ['กรุงเทพ', 'เชียงใหม่', 'ขอนแก่น', 'หาดใหญ่', 'ระยong'],
        datasets: [{
            label: 'จำนวนลูกค้า',
            data: [65, 59, 80, 81, 56],
            backgroundColor: [
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)'
            ],
            borderWidth: 1
        }]
    };

    chart5Data = {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
            label: 'การเติบโต (%)',
            data: [5, 12, 18, 25, 32],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true
        }]
    };

    chart6Data = {
        labels: ['Online', 'ร้านค้า', 'ตัวแทน', 'โทรศัพท์'],
        datasets: [{
            label: 'สัดส่วนการขาย (%)',
            data: [40, 35, 15, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)'
            ],
            borderWidth: 1
        }]
    };

    chart7Data = {
        labels: ['ทีม A', 'ทีม B', 'ทีม C', 'ทีม D', 'ทีม E'],
        datasets: [{
            label: 'ประสิทธิภาพ (%)',
            data: [85, 92, 78, 88, 95],
            backgroundColor: 'rgba(255, 159, 64, 0.8)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 2
        }]
    };

    chart8Data = {
        labels: ['มาก', 'ปานกลาง', 'น้อย', 'น้อยมาก'],
        datasets: [{
            label: 'ความพึงพอใจ (%)',
            data: [45, 35, 15, 5],
            backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(201, 203, 207, 0.8)'
            ],
            borderWidth: 1
        }]
    };

    chart9Data = {
        labels: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
        datasets: [{
            label: 'การใช้งาน (ชั่วโมง)',
            data: [8, 7, 9, 8, 6, 4, 3],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            fill: true
        }]
    };

    chart10Data = {
        labels: ['โครงการ A', 'โครงการ B', 'โครงการ C', 'โครงการ D'],
        datasets: [{
            label: 'ROI (%)',
            data: [150, 200, 120, 180],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)'
            ],
            borderWidth: 1
        }]
    };

    ngAfterViewInit() {
        this.createLineChart();
        this.createBarChart();
        this.createChart3();
        this.createChart4();
        this.createChart5();
        this.createChart6();
        this.createChart7();
        this.createChart8();
        this.createChart9();
        this.createChart10();
    }

    createLineChart() {
        const ctx = this.lineChartCanvas.nativeElement.getContext('2d');
        if (ctx) {
            this.lineChart = new Chart(ctx, {
                type: 'line' as ChartType,
                data: this.chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: false
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value.toLocaleString() + ' บาท';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    createBarChart() {
        const ctx = this.barChartCanvas.nativeElement.getContext('2d');
        if (ctx) {
            this.barChart = new Chart(ctx, {
                type: 'bar' as ChartType,
                data: this.barChartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: false
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value + ' ล้านบาท';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    createChart3() {
        const ctx = this.chart3Canvas.nativeElement.getContext('2d');
        if (ctx) {
            this.chart3 = new Chart(ctx, {
                type: 'bar' as ChartType,
                data: this.chart3Data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: false },
                        legend: { display: true, position: 'top' }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value + ' หน่วย';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    createChart4() {
        const ctx = this.chart4Canvas.nativeElement.getContext('2d');
        if (ctx) {
            this.chart4 = new Chart(ctx, {
                type: 'doughnut' as ChartType,
                data: this.chart4Data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: false },
                        legend: { display: true, position: 'bottom' }
                    }
                }
            });
        }
    }

    createChart5() {
        const ctx = this.chart5Canvas.nativeElement.getContext('2d');
        if (ctx) {
            this.chart5 = new Chart(ctx, {
                type: 'line' as ChartType,
                data: this.chart5Data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: false },
                        legend: { display: true, position: 'top' }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    createChart6() {
        const ctx = this.chart6Canvas.nativeElement.getContext('2d');
        if (ctx) {
            this.chart6 = new Chart(ctx, {
                type: 'pie' as ChartType,
                data: this.chart6Data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: false },
                        legend: { display: true, position: 'bottom' }
                    }
                }
            });
        }
    }

    getCurrentDate(): string {
        return new Date().toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    async exportToPDF() {
        try {
            // Show loading state
            const exportButton = document.querySelector('.export-btn') as HTMLButtonElement;
            if (exportButton) {
                exportButton.disabled = true;
                exportButton.textContent = 'กำลังสร้าง PDF...';
            }

            // Capture the entire container
            const canvas = await html2canvas(this.exportContainer.nativeElement, {
                scale: 2, // Higher quality
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: this.exportContainer.nativeElement.scrollWidth,
                height: this.exportContainer.nativeElement.scrollHeight,
                scrollX: 0,
                scrollY: 0
            });

            // Create PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = 210; // A4 width in mm
            const pdfHeight = 297; // A4 height in mm
            const margin = 10; // 10mm margin on all sides

            // Available space after margins
            const availableWidth = pdfWidth - (margin * 2);
            const availableHeight = pdfHeight - (margin * 2);

            // Calculate dimensions to fit content in available space
            let imgWidth = availableWidth;
            let imgHeight = (canvas.height * imgWidth) / canvas.width;

            // If content is too tall, scale it down to fit available height
            if (imgHeight > availableHeight) {
                console.log(`Content height (${imgHeight + margin * 2}mm) exceeds A4 height (${pdfHeight}mm). Scaling to fit one page.`);
                imgHeight = availableHeight;
                imgWidth = (canvas.width * imgHeight) / canvas.height;
            }

            // Center the content within available space
            const xOffset = margin + (availableWidth - imgWidth) / 2;
            const yOffset = margin + (availableHeight - imgHeight) / 2;

            // Add the image to PDF (scaled to fit one page with margins)
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', xOffset, yOffset, imgWidth, imgHeight);

            // Save the PDF
            const fileName = `chart-report-${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);

            // Reset button state
            if (exportButton) {
                exportButton.disabled = false;
                exportButton.textContent = 'ดาวน์โหลด PDF (One Page)';
            }

            console.log('PDF exported successfully!');
        } catch (error) {
            console.error('Error exporting PDF:', error);

            // Reset button state on error
            const exportButton = document.querySelector('.export-btn') as HTMLButtonElement;
            if (exportButton) {
                exportButton.disabled = false;
                exportButton.textContent = 'ดาวน์โหลด PDF (One Page)';
            }
        }
    }

    createChart7() {
        const ctx = this.chart7Canvas.nativeElement.getContext('2d');
        if (ctx) {
            this.chart7 = new Chart(ctx, {
                type: 'bar' as ChartType,
                data: this.chart7Data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: false },
                        legend: { display: true, position: 'top' }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    createChart8() {
        const ctx = this.chart8Canvas.nativeElement.getContext('2d');
        if (ctx) {
            this.chart8 = new Chart(ctx, {
                type: 'doughnut' as ChartType,
                data: this.chart8Data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: false },
                        legend: { display: true, position: 'bottom' }
                    }
                }
            });
        }
    }

    createChart9() {
        const ctx = this.chart9Canvas.nativeElement.getContext('2d');
        if (ctx) {
            this.chart9 = new Chart(ctx, {
                type: 'line' as ChartType,
                data: this.chart9Data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: false },
                        legend: { display: true, position: 'top' }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value + ' ชม.';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    createChart10() {
        const ctx = this.chart10Canvas.nativeElement.getContext('2d');
        if (ctx) {
            this.chart10 = new Chart(ctx, {
                type: 'bar' as ChartType,
                data: this.chart10Data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { display: false },
                        legend: { display: true, position: 'top' }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    refreshCharts() {
        // Destroy all existing charts
        [this.lineChart, this.barChart, this.chart3, this.chart4, this.chart5, this.chart6, 
         this.chart7, this.chart8, this.chart9, this.chart10].forEach(chart => {
            if (chart) chart.destroy();
        });
        
        // Recreate all charts
        this.createLineChart();
        this.createBarChart();
        this.createChart3();
        this.createChart4();
        this.createChart5();
        this.createChart6();
        this.createChart7();
        this.createChart8();
        this.createChart9();
        this.createChart10();
    }
}