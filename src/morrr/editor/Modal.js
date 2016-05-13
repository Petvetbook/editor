"use realm";

import frzr;

let modalIndex = 1000;
let instances = 0;
let el = frzr.el;
let overlay = false;

class Modal {

   /**
    * constructor - description
    *
    * @param  {type} opts description
    * @return {type}      description
    */
   constructor(opts) {
      var self = this;
      opts = opts || {};
      var target = opts.target || document.body;

      this.header = el('div', {
         class: "header",
         textContent: opts.title || "opts.title"
      });

      this.successButton = el('div', {
         class: 'button success',
         textContent: opts.successButton || "Done"
      });
      this.closeButton = el('div', {
         class: 'button close',
         textContent: opts.successButton || "Close"
      });
      $(this.closeButton).click(function() {
         self.close();
      });
      this.footer = el('div', {
         class: 'footer'
      }, [this.closeButton, this.successButton]);

      this.content = el('div', {
         class: 'content'
      });
      this.modal = el('div', {
         class: "morrr-modal",
         style: ("z-index:" + modalIndex++),
      }, [this.header, this.content, this.footer]);

      //this.createOverlay();
      $(target).prepend(this.modal);
      instances++;
   }

   close() {
      instances--;
      $(this.modal).remove();
      if (instances === 0) {
         $(this.overlay).remove();
      }
   }

   setContents(element) {
      $(this.content).append(element)
   }

   createOverlay() {
      if (overlay === false) {
         this.overlay = el('div', {
            class: "morrr-overlay"
         });
         $(document.body).prepend(this.overlay);
      }
   }

   /**
    * disableSuccess - description
    *
    * @return {type}  description
    */
   disableSuccess() {
      if (!$(this.successButton).hasClass('disabled')) {
         $(this.successButton).addClass('disabled');
      }
      this.saveLock = true;
   }

   /**
    * enableSuccess - description
    *
    * @return {type}  description
    */
   enableSuccess() {
      $(this.successButton).removeClass('disabled');
      this.saveLock = false;
   }

   /**
    * static - description
    *
    * @param  {type} opts description
    * @return {type}      description
    */
   static create(opts) {
      var modal = new Modal(opts);
      return modal;
   }
}
export Modal;
