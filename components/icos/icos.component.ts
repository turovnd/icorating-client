import {isUndefined} from "util";

import {MaterializeAction} from 'angular2-materialize';
const Materialize = require('materialize-css/dist/js/materialize.js');
const $ = require('jquery/dist/jquery.js');

import {Component, EventEmitter, OnInit} from "@angular/core";
import {ICOService} from "../../services/ico.service";
import {ICO} from "../../models/ICO";

@Component({
    selector: 'icos',
    templateUrl: 'icos.component.html',
    styles: [require('./icos.component.css').toString()],
    providers: [ ICOService ]
})

export class ICOsComponent implements OnInit {
    model: any = {};
    icos: ICO[] = [];
    newICOModal = new EventEmitter<string|MaterializeAction>();

    constructor(private icoService: ICOService) { }

    ngOnInit() {
        this.icoService.getICOs()
            .subscribe(res => {
                if (res.status === 1) {
                    this.icos = res.data;
                } else {
                    Materialize.toast(res.message, 2000);
                }
            });
    }

    closeModal() {
        this.newICOModal.emit({action:"modal", params:['close']});
        $('#newICO').trigger('reset');
    }

    addICO(event) {
        event.preventDefault();
        if (isUndefined(this.model.name)) {
            Materialize.toast("Не указано имя", 2000);
            return;
        }
        if (isUndefined(this.model.website) || this.model.website.indexOf('://') === -1) {
            Materialize.toast("Не правильно указан веб-сайт, укажите в формате `https://example.com`", 4000);
            return;
        }
        if (isUndefined(this.model.telegram) || this.model.telegram.indexOf('@') === -1 || this.model.telegram.indexOf('/') !== -1) {
            Materialize.toast("Не правильно указано имя канала, укажите в формате `@channel`", 4000);
            return;
        }
        if (isUndefined(this.model.bitcointalk) || this.model.bitcointalk.indexOf('.') !== -1 || this.model.bitcointalk.indexOf('/') !== -1) {
            Materialize.toast("Не правильно указан номер топика bitcointalk, укажите в формате `123456`, без точек", 4000);
            return;
        }
        if (isUndefined(this.model.twitter) || this.model.twitter.indexOf('/') !== -1) {
            Materialize.toast("Не правильно указано имя в twitter, укажите в формате `icorating`", 4000);
            return;
        }
        if (isUndefined(this.model.facebook) || this.model.facebook.indexOf('/') !== -1) {
            Materialize.toast("Не правильно указано имя в facebook, укажите в формате `icorating`", 4000);
            return;
        }
        if (isUndefined(this.model.reddit) || this.model.reddit.indexOf('/') !== -1) {
            Materialize.toast("Не правильно указано имя в reddit, укажите в формате `ICOrating`", 4000);
            return;
        }
        if (isUndefined(this.model.medium) || this.model.medium.indexOf('@') === -1 || this.model.medium.indexOf('/') !== -1) {
            Materialize.toast("Не правильно указано имя в medium, укажите в формате `@icoRating`", 4000);
            return;
        }
        $('#newICO').find('> .modal-wrapper').addClass('loading');
        this.icoService.addICO(this.model)
            .subscribe(res => {
                Materialize.toast(res.message, 2000);
                $('#newICO').find('> .modal-wrapper').removeClass('loading');
                this.closeModal();
                if (res.status === 1) {
                    this.icos.unshift(res.data)
                }
            });
    }

    deleteICO(id) {
        this.icoService.deleteICO(id)
            .subscribe(res => {
                if (res.status === 1) {
                    for (let i = 0; i < this.icos.length; i++) {
                        if (this.icos[i].id === id) {
                            this.icos.splice(i, 1);
                            Materialize.toast(res.message, 2000);
                            break;
                        }
                    }
                }
            });
    }

    openEditICO(id) {
        $('#updateBtn'+id).removeClass('disabled');
        $('#openEditBtn'+id).addClass('disabled');
        $('#name'+id).removeAttr('disabled');
        $('#telegram'+id).removeAttr('disabled');
        $('#website'+id).removeAttr('disabled');
        $('#bitcointalk'+id).removeAttr('disabled');
        $('#twitter'+id).removeAttr('disabled');
        $('#facebook'+id).removeAttr('disabled');
        $('#reddit'+id).removeAttr('disabled');
        $('#medium'+id).removeAttr('disabled');
    }

    updateICO(id) {
        $('#ico'+id).addClass('loading');
        $('#updateBtn'+id).addClass('disabled');
        $('#openEditBtn'+id).removeClass('disabled');

        let name = $('#name'+id),
            website = $('#website'+id),
            telegram = $('#telegram'+id),
            bitcointalk = $('#bitcointalk'+id),
            twitter = $('#twitter'+id),
            facebook = $('#facebook'+id),
            reddit = $('#reddit'+id),
            medium = $('#medium'+id);

        name.attr('disabled', 'disabled');
        website.attr('disabled', 'disabled');
        telegram.attr('disabled', 'disabled');
        bitcointalk.attr('disabled', 'disabled');
        twitter.attr('disabled', 'disabled');
        facebook.attr('disabled', 'disabled');
        reddit.attr('disabled', 'disabled');
        medium.attr('disabled', 'disabled');

        this.icoService.updateICO(id, {
            name: name.val(),
            website: website.val(),
            telegram: telegram.val(),
            bitcointalk: bitcointalk.val(),
            twitter: twitter.val(),
            facebook: facebook.val(),
            reddit: reddit.val(),
            medium: medium.val()
        })
            .subscribe(res => {
                if (res.status === 1) {
                    for (let i = 0; i < this.icos.length; i++) {
                        if (this.icos[i].id === id) {
                            this.icos[i] = res.data;
                            break;
                        }
                    }
                }
                $('#ico'+id).removeClass('loading');
                Materialize.toast(res.message, 2000);
            });

    }
}