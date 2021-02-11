function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

shuffle(parceiros);

var speakersList = [];

for(let i = 0; i < palestras.length; i++){
    var speakers = [];
    Object.assign(speakers, palestras[i]['speakers']);
    speakers.forEach(speaker => {
        speakersList.push(speaker);
    });
}

const getProfessorById = (id) => {
    return professores.find(professor => professor.id == id);
}

const markdownText = (text) => {
    return marked(text);
}

const SpeakersGrid = () => {
    return(
        professores.map(speaker => (
            <Speakers data={speaker} key={speaker.id} />
        ))
    );
}

const Speakers = (props) => {
    const getProfessorVideo = () => {
        if(props.data.video_invite){
            return(
                <div className="speaker-icon">
                    <a href={props.data.video_invite} onClick={() => { 
                        gtag('event', 'watch_speaker_video_invite', {
                            'value': props.data.name
                        });
                    }} data-lity><i className="zmdi zmdi-youtube-play"></i></a>
                </div>
            );
        }
    }

    return(
        <div className="col-12 col-md-6 col-lg-4">
          <div className="single-speaker-area bg-gradient-overlay-2 wow fadeInUp" data-wow-delay="300ms">

            <div className="speaker-single-thumb">
              <img src={props.data.photo} alt={'Foto '+props.data.name}/>
            </div>
            {
                getProfessorVideo()
            }
            <div className="speaker-info">
              <h5>{props.data.name}</h5>
              <p>{props.data.career}</p>
            </div>
          </div>
        </div>
    );
}

const CronogramaItem = (props) => {
    function getSpeakersPhoto(){
        if(props.data.speakers !== undefined){
            return props.data.speakers.map(speaker => {
                speaker = getProfessorById(speaker);
                return <div className="single-schedule-tumb" key={speaker.id}>
                    <img src={speaker.thumbnail} alt={"Foto "+speaker.name}/>
                </div>
            });
        }
    }

    function getSpeakersName(){
        if(props.data.speakers !== undefined){
            if(props.data.speakers.length > 1){
                var speakersName = [];
                props.data.speakers.map(speaker => {
                    speaker = getProfessorById(speaker);
                    speakersName.push(speaker.name);
                });
                return <p>por <span>{speakersName.join(' e ')}</span></p>;
            }
            return <p>por {
                props.data.speakers.map(speaker => {
                    speaker = getProfessorById(speaker);
                    return <span key={speaker.id}>{speaker.name}</span>;
                })
            }</p>
        }
    }

    return(
        <div className="single-schedule-area d-flex flex-wrap justify-content-between align-items-center wow fadeInUp" data-wow-delay="300ms">
            <div className="single-schedule-tumb-info d-flex align-items-center">
                {getSpeakersPhoto()}           
                <div className="single-schedule-info">
                    <h6>{props.data.name}</h6>
                    {getSpeakersName()}
                </div>
            </div>
            {props.data.speakers ?
                <div className="schedule-time-place">
                    <p><i className="zmdi zmdi-time"></i> {props.data.time}</p>
                    <p><i className="zmdi zmdi-hourglass-alt"></i> 1 hora</p>
                </div>
                :
                ""
            }
            {props.data.speakers ?
                <a href={"#palestraModal"+props.data.id} rel="modal:open" className="btn confer-btn">Ver mais <i className="zmdi zmdi-long-arrow-right"></i></a>
                :
                ""
            }
            {props.data.speakers ?
                <PalestraModal data={props.data} />
            :
                ""
            }
        </div>
    )
}

const CronogramaDia = (props) => {
    return(
        <div className="single-tab-content">
            <div className="row">
                <div className="col-12">
                    {palestras.filter(palestra => palestra.day == props.day).map(palestra => (
                        <CronogramaItem data={palestra} key={palestra.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

const PalestraModal = (props) => {
    let modalStyle = {
        display: "none",
        height: "auto"
    };

    function getMarkdownText(){
        if(props.data.about !== undefined){
            return {
                __html: markdownText(props.data.about)
            };
        }else{
            return {
                __html: "Sem informações."
            };
        }
    }

    function getSpeakersName(){
        if(props.data.speakers !== undefined){
            if(props.data.speakers.length > 1){
                var speakersName = [];
                props.data.speakers.map(speaker => {
                    speaker = getProfessorById(speaker);
                    speakersName.push(speaker.name);
                });
                return <span>{speakersName.join(' e ')}</span>;
            }
            return props.data.speakers.map(speaker => {
                    speaker = getProfessorById(speaker);
                    return <span key={speaker.id}>{speaker.name}</span>;
            });
        }
    }

    return(
        <div id={"palestraModal"+props.data.id} className="modal palestraModal" style={modalStyle} key={props.data.id}>
            <p className="title">{props.data.name}</p>
            <p className="speaker">por {getSpeakersName()}</p>
            <hr/>
            <div className="about" dangerouslySetInnerHTML={getMarkdownText()}></div>
        </div>
    );
}

const Parceiro = (props) => {
    return(
        <div className="single-sponsor wow fadeInUp" data-wow-delay="300ms">
            <a href={props.data.site} target="_blank">
                <img src={props.data.logo} alt={"Logo "+props.data.name} />
            </a>
        </div>
    );
}

const ParceirosGrid = (props) => {
    return(
        parceiros.map(parceiro => (
            <Parceiro data={parceiro} key={parceiro.id} />
        ))
    );
}

const VideosInvites = () => {
    function componentDidMount(){
        console.log("Componente renderizado");
    }
    return(
        videos_invites.map(video_invite => (
            <VideoInvite data={video_invite} key={video_invite.id}/>
        ))
    );
}

const VideoInvite = (props) => {
    return(
        <div className="invite-video col-lg-6 col-12">
            <iframe width="100%" height="350px" src={"https://www.youtube.com/embed/" + props.data.id} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    );
}

ReactDOM.render(
    <SpeakersGrid />,
    document.getElementById('gridPalestras')
);

ReactDOM.render(
    <CronogramaDia day='1' />,
    document.getElementById('day1')
);

ReactDOM.render(
    <CronogramaDia day='2' />,
    document.getElementById('day2')
);

ReactDOM.render(
    <CronogramaDia day='3' />,
    document.getElementById('day3')
);

ReactDOM.render(
    <ParceirosGrid/>,
    document.getElementById('gridParceiros')
);

ReactDOM.render(
    <span>Conheça nosso time de {professores.length} palestrantes!</span>,
    document.getElementById('numeroPalestrantes')
);

ReactDOM.render(
    <VideosInvites/>,
    document.getElementById('invitesCarousel')
);