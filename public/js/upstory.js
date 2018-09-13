var app = angular.module("story", ["ngRoute"])
app.controller("upStoryController", function ($scope) {

    $scope.upstory = function () {
        var arrVocab = [];
        var arrIdiom = [];
        var rowVocab = document.getElementById('vocabs').getElementsByClassName('row');
        var rowIdiom = document.getElementById('idioms').getElementsByClassName('row');
        for (let index = 0; index < rowVocab.length; index++) {
            var items = rowVocab[index].getElementsByTagName('textarea');
            var object = new Object();
            object.vocabWord = items[0].value;
            object.vocabMeaning = items[1].value;
            object.phonemic = items[2].value
            arrVocab.push(object)
        }

        for (let index = 0; index < rowIdiom.length; index++) {
            var items = rowIdiom[index].getElementsByTagName('textarea');
            var object = new Object();
            object.idiomSentence = items[0].value;
            object.idiomMeaning = items[1].value;
            arrIdiom.push(object)
        }

        $.post("api/v1.0/story", {
            keyupload: $scope.keyupload,
            storyName: $scope.storyName,
            storyOriginal: $scope.storyOriginal,
            storyVietNam: $scope.storyVN,
            vocabs: arrVocab,
            idioms: arrIdiom
        }, function (res) {
            if (res.code == 200) {
                swal("Thanh cong roi nhe ")
            } else {
                swal("That bai  " + res.message)
            }
        })

    }

    $scope.newRowVocab = function () {
        addNewRowVocab();
    }

    $scope.newIdiom = function () {
        newIdiom();
    }
})

function addNewRowVocab() {
    $('#vocabs').append('<div class="row"><textarea class="form-control col-sm-4 col-md-4 my-input-film ng-pristine ng-valid ng-empty ng-touched"placeholder="Word"></textarea><textarea class="form-control col-sm-4 col-md-4 my-input-film ng-pristine ng-valid ng-empty ng-touched"placeholder="Meaning"></textarea><textarea class="form-control col-sm-4 col-md-4 my-input-film ng-pristine ng-valid ng-empty ng-touched"placeholder="Phonemic"></textarea></div >');
}


function newIdiom() {
    $('#idioms').append('<div class="row"><textarea class="form-control col-sm-6 col-md-6 my-input-film ng-pristine ng-valid ng-empty ng-touched" placeholder="Idiom..."></textarea><textarea class="form-control col-sm-6 col-md-6 my-input-film ng-pristine ng-valid ng-empty ng-touched" placeholder="Meaning..."></textarea></div >');
}