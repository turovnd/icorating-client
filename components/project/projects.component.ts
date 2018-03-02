import {isUndefined} from "util";

import {MaterializeAction} from 'angular2-materialize';
const Materialize = require('materialize-css/dist/js/materialize.js');
const $ = require('jquery/dist/jquery.js');

import {Component, EventEmitter, OnInit} from "@angular/core";
import {ProjectService} from "../../services/project.service";
import {Project} from "../../models/Project";

@Component({
    selector: 'projects',
    templateUrl: 'projects.component.html',
    styles: [require('./projects.component.css').toString()],
    providers: [ ProjectService ]
})

export class ProjectsComponent implements OnInit {
    model: any = {};
    projects: Project[] = [];
    newWalletModal = new EventEmitter<string|MaterializeAction>();

    constructor(private projectService: ProjectService) { }

    ngOnInit() {
        this.projectService.getProjects()
            .subscribe(res => {
                if (res.status === 1) {
                    this.projects = res.data;
                } else {
                    Materialize.toast(res.message, 2000);
                }
            });
    }

    closeModal() {
        this.newWalletModal.emit({action:"modal", params:['close']});
        $('#newWallet').trigger('reset');
        $('#projectWallets').material_chip({data:[],placeholder:'Enter wallet address'});
    }

    addProject(event) {
        event.preventDefault();
        let wallets = $('#projectWallets').material_chip('data');
        if (isUndefined(this.model.name) || isUndefined(this.model.name) || wallets.length === 0) {
            Materialize.toast("Заполнены не все поля", 2000);
            return;
        }
        this.model.wallets = wallets.map(function(el){ return el.tag }).join(',');
        $('#newWallet').find('> .modal-wrapper').addClass('loading');
        this.projectService.addProjects(this.model)
            .subscribe(res => {
                Materialize.toast(res.message, 2000);
                $('#newWallet').find('> .modal-wrapper').removeClass('loading');
                this.closeModal();
                if (res.status === 1) {
                    this.projects.unshift(res.data)
                }
            });
    }

    deleteProject(id) {
        this.projectService.deleteProject(id)
            .subscribe(res => {
                if (res.status === 1) {
                    for (let i = 0; i < this.projects.length; i++) {
                        if (this.projects[i].id === id) {
                            this.projects.splice(i, 1);
                            Materialize.toast(res.message, 2000);
                            break;
                        }
                    }
                }
            });
    }

    openEditProject(id) {
        $('#updateBtn'+id).removeClass('disabled');
        $('#openEditBtn'+id).addClass('disabled');
        $('#projectName'+id).removeAttr('disabled');
        $('#ticker'+id).removeAttr('disabled');
        let wallets = $('#wallets'+id);
        wallets.material_chip({data:wallets.find('.chip').map(function (i, el) { return {tag: el.outerText } }).toArray(), placeholder:'Enter wallet address'});
    }

    updateProject(id) {
        $('#project'+id).addClass('loading');
        $('#updateBtn'+id).addClass('disabled');
        $('#openEditBtn'+id).removeClass('disabled');
        let name = $('#projectName'+id),
            ticker = $('#ticker'+id),
            wallets = $('#wallets'+id),
            walletsData = wallets.material_chip('data').map(function(el){ return el.tag });

        name.attr('disabled', 'disabled');
        ticker.attr('disabled', 'disabled');
        wallets.empty();

        for (let i = 0; i < walletsData.length; i++) {
            wallets.append('<div class="chip">' + walletsData[i] + '</div>')
        }

        this.projectService.updateProject(id, {name: name.val(), ticker: ticker.val(), wallets: walletsData.join(',')})
            .subscribe(res => {
                if (res.status === 1) {
                    for (let i = 0; i < this.projects.length; i++) {
                        if (this.projects[i].id === id) {
                            this.projects[i] = res.data;
                            break;
                        }
                    }
                }
                $('#project'+id).removeClass('loading');
                Materialize.toast(res.message, 2000);
            });

    }
}