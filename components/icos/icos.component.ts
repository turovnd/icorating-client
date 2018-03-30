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

        if (! (this.model.telegram === "" || isUndefined(this.model.telegram))) {
            if (this.model.telegram.search(/https:\/\/t.me/) === -1) {
                Materialize.toast("Не правильно указано имя канала telegram, укажите в формате `https://t.me/chanelname`", 4000);
                return;
            }
        }

        if (! (this.model.bitcointalk === "" || isUndefined(this.model.bitcointalk))) {
            if (this.model.bitcointalk.search(/https:\/\/bitcointalk.org\/index.php\?topic=/) === -1 ) {
                Materialize.toast("Не правильно указан номер топика bitcointalk, укажите в формате `https://bitcointalk.org/index.php?topic=123456`", 4000);
                return;
            }
        }

        if (! (this.model.twitter === "" || isUndefined(this.model.twitter))) {
            if (this.model.twitter.search(/https:\/\/twitter.com/) === -1) {
                Materialize.toast("Не правильно указано имя в twitter, укажите в формате `https://twitter.com/icorating`", 4000);
                return;
            }
        }

        if (! (this.model.facebook === "" || isUndefined(this.model.facebook))) {
            if (this.model.facebook.search(/https:\/\/www.facebook.com/) === -1) {
                Materialize.toast("Не правильно указано имя в facebook, укажите в формате `https://www.facebook.com/icorating`", 4000);
                return;
            }
        }

        if (! (this.model.reddit === "" || isUndefined(this.model.reddit))) {
            if (this.model.reddit.search(/https:\/\/www.reddit.com\/r/) === -1) {
                Materialize.toast("Не правильно указано имя в reddit, укажите в формате `https://www.reddit.com/r/ICOrating`", 4000);
                return;
            }
        }

        if (! (this.model.medium === "" || isUndefined(this.model.medium))) {
            if (this.model.medium.search(/https:\/\/medium.com\/@/) === -1) {
                Materialize.toast("Не правильно указано имя в medium, укажите в формате `https://medium.com/@icorating`", 4000);
                return;
            }
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