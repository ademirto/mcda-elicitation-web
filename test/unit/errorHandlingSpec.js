'use strict';
define(['angular-mocks', 'mcda/services/errorHandling'],
  function() {
    describe('the errorHandling', function() {

      beforeEach(module('elicit.errorHandling'));

      it('should broadcast an error when responseError is called', inject(function($rootScope, ErrorHandling) {
        var rejection = {
          data: {
            code: 1,
            cause: 'cause'
          }
        };
        spyOn($rootScope, '$broadcast');
        ErrorHandling.responseError(rejection);
        expect($rootScope.$broadcast).toHaveBeenCalled();
      }));
    });
  });
