import React, { useEffect, useRef,useState } from 'react'
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import moment from 'moment'
import axios from 'axios'

import Logo from "./../public/img/robot.png"
import Work from "./../public/img/briefcase.png"
import Rest from "./../public/img/cold-coffee.png"
import Home from "./../public/img/home.png"
import Back from "./../public/img/go-to-work.png"
import Smile from "./../public/img/happy.png"
import Sad from "./../public/img/sad.png"
import Permit from "./../public/img/alarm.png"

import SuccessSound from './../public/sound/success.mp3'
import FailSound from './../public/sound/fail.mp3'



  const token = 'ITOTRTREIT789897THJGE7868967HJDGHDKJGKTGRKUIY5786546GN8M7568U67'
  const baseApiUrl = 'https://www.sas-api.jualdecal.com/'
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }


function Body() {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("loginData");
      navigate("/");
    };

    const inputRef = useRef(null)
    const [inputValue, setInputValue] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [msgValue,setMsgValue] = useState('')
    const [username,setUserName] = useState('')
    const [resultMsg,setResultMsg] = useState(Smile)
    const [mode,setMode] = useState('kerja')

    const [isPlaying, setIsPlaying] = useState(false)

    const playSound = () => {
      const audio = new Audio(SuccessSound)
      audio.play()
      setIsPlaying(true)
    };

    const playFail = () => {
      const audio = new Audio(FailSound)
      audio.play()
      setIsPlaying(true)
    };


  function handleResponse(response){
    if(response.data['message']=='success absen'){
      setMsgValue('Absen berhasil, selamat bekerja')
      setUserName('Hai, '+response.data['username'])
     
      setResultMsg(Smile)
      playSound()
      handlePopUp()
    }
    if(response.data['message']=='success pulang'){
      setMsgValue('Terima Kasih Untuk Hari Ini. Hati Hati Di Jalan')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Smile)
      playSound()
      handlePopUp()
    }
    if(response.data['message']=='success rehat'){
      setMsgValue('Selamat Beristirahat')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Smile)
      playSound()
      handlePopUp()
    }
    if(response.data['message']=='success kembali'){
      setMsgValue('Waktunya Kembali Bekerja')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Smile)
      playSound()
      handlePopUp()
    }
    if(response.data['message']=='success izin'){
      setMsgValue('izin diterima')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Smile)
      playSound()
      handlePopUp()
    }
    if(response.data['message']=='id invalid'){
      setMsgValue('Kami Tidak Mengenalmu')
      setResultMsg(Sad)
      playFail()
      handlePopUp()
    }
    if(response.data['message']=='sudah absen'){
      setMsgValue('Kamu kan sudah absen')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Sad)
      playFail()
      handlePopUp()
    }
    if(response.data['message']=='belum absen'){
      setMsgValue('Kamu kan belum absen')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Sad)
      playFail()
      handlePopUp()
    }
    if(response.data['message']=='sudah pulang'){
      setMsgValue('Kamu kan sudah pulang')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Sad)
      playFail()
      handlePopUp()
    }
    if(response.data['message']=='sudah rehat'){
      setMsgValue('Kamu kan sudah istirahat')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Sad)
      playFail()
      handlePopUp()
    }
    if(response.data['message']=='sudah kembali'){
      setMsgValue('Kamu kan sudah kembali dari istirahat')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Sad)
      playFail()
      handlePopUp()
    }
    if(response.data['message']=='sudah izin'){
      setMsgValue('Kamu sudah izin')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Sad)
      playFail()
      handlePopUp()
    }
    if(response.data['message']=='belum rehat'){
      setMsgValue('Kamu kan belum istirahat')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Sad)
      playFail()
      handlePopUp()
    }
    if(response.data['message']=='belum izin'){
      setMsgValue('Kamu kan belum izin')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Sad)
      playFail()
      handlePopUp()
    }
    if(response.data['message']=='kembali dulu'){
      setMsgValue('habis istirahat? absen kembali dulu')
      setUserName('Hai, '+response.data['username'])
      setResultMsg(Sad)
      playFail()
      handlePopUp()
    }
  }

  function postAbsen(url, data,headers) {
        axios.post(url, data,headers)
        .then(response => {
          handleResponse(response)

      })
      .catch(error => {
        setMsgValue('Maaf, Server sedang bermasalah')
        handlePopUp()
      });
    }


  function postPulang(url, data,headers) {
      axios.post(url, data,headers)
      .then(response => {
        handleResponse(response)

    })
    .catch(error => {
      setMsgValue('Maaf, Server sedang bermasalah')
      handlePopUp()
    });
  }

  function postRehat(url, data,headers) {
    axios.post(url, data,headers)
    .then(response => {
      handleResponse(response)

  })
  .catch(error => {
    setMsgValue('Maaf, Server sedang bermasalah')
    handlePopUp()
  });
  }


  function postKembali(url, data,headers) {
    axios.post(url, data,headers)
    .then(response => {
      handleResponse(response)

  })
  .catch(error => {
    setMsgValue('Maaf, Server sedang bermasalah')
    handlePopUp()
  });
  }



    //handle agar input selalu fokus meski di klik apapun di layar
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          inputRef.current.focus()
        }
      }
      document.addEventListener('click', handleClickOutside)
  
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }, [])


    //handle modal auto menutup dalam sekian waktu detik
    useEffect(() => {
        if (isModalOpen) {
          const timer = setTimeout(() => {
            setIsModalOpen(false)
            setUserName('')
          }, 4000)
    
          return () => clearTimeout(timer)
        }
      }, [isModalOpen])

      //function membuka modal
      const handlePopUp = () => {
        setIsModalOpen(true)
        // Panggil fungsi lain yang diperlukan
        setInputValue('')
      }

    //handle validasi apakah input benar benar terisi
    useEffect(() => {
        const timer = setTimeout(() => {
        if (inputValue.trim() !== '') {
            const jam = moment().format('HH:mm')
            const tanggal = moment().format('YYYY-MM-DD')
           
            // setMsgValue(inputValue)
            // handleXFunction()
            const dataAbsen ={
              "Jam_Masuk": jam,
              "Tanggal": tanggal,
              "ID_Karyawan":inputValue
            }
            const dataPulang ={
              "Jam_Pulang": jam,
              "Tanggal": tanggal,
              "ID_Karyawan":inputValue
            }
            const dataRehat ={
              "Jam_Istirahat": jam,
              "Tanggal": tanggal,
              "ID_Karyawan":inputValue
            }
            const dataKembali ={
              "Jam_Kembali": jam,
              "Tanggal": tanggal,
              "ID_Karyawan":inputValue
            }
            const dataIzin ={
              "Jam_Izin": jam,
              "Tanggal": tanggal,
              "ID_Karyawan":inputValue
            }
            const dataKembaliIzin ={
              "Jam_Kembali_Izin": jam,
              "Tanggal": tanggal,
              "ID_Karyawan":inputValue
            }

            if(mode=='kerja'){
              postAbsen(baseApiUrl+'Absen/'+inputValue,dataAbsen,config)
            }
            if(mode=='pulang'){
              postPulang(baseApiUrl+'Pulang/'+inputValue,dataPulang,config)
            }
            if(mode=='rest'){
              postRehat(baseApiUrl+'Rehat/'+inputValue,dataRehat,config)
            }
            if(mode=='kembali'){
              postKembali(baseApiUrl+'Kembali/'+inputValue,dataKembali,config)
            }
            if(mode=='izin'){
              postKembali(baseApiUrl+'Izin/'+inputValue,dataIzin,config)
            }
            if(mode=='kembali_izin'){
              postKembali(baseApiUrl+'KembaliIzin/'+inputValue,dataKembaliIzin,config)
            }
           
        }
        }, 500)

        return () => clearTimeout(timer)
    }, [inputValue])

    // deteksi perubahan di input
    const handleInputChange = (event) => {

        //check validasi jam kerja 08.00 - 00.00 jika true, maka lanjut proses berikutnya ->
        setInputValue(event.target.value)

        //jika false maka tampilkan pesan 
    }

    const handleKeyDown = (e) => {
      // Blok semua input manual
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
      }
    };
  
    const handlePaste = (e) => {
      e.preventDefault(); // blok paste
    };


    useEffect(() => {
      inputRef.current.focus()
    }, [])


  return (
    <div className=' flex flex-col items-center justify-center w-screen h-screen bg-[#191923] relative '>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
          <div 
          onClick={()=>setMode('kerja')}
          className={`flex flex-row gap-x-4 items-center px-4 py-2  ${mode=='kerja' ? 'bg-slate-700' : 'bg-slate-800'} rounded cursor-pointer`}>
            <img src={Work} alt="Deskripsi Gambar" className='w-8' />
            <p className='font-semibold text-slate-200'>masuk</p>
          </div>

          <div
          onClick={()=>setMode('pulang')}
          className={`flex flex-row gap-x-4 items-center px-4 py-2  ${mode=='pulang' ? 'bg-slate-700' : 'bg-slate-800'} rounded cursor-pointer`}>
            <img src={Home} alt="Deskripsi Gambar" className='w-8' />
            <p className='font-semibold text-slate-200'>pulang</p>
          </div>

          

          <div 
          onClick={()=>setMode('rest')}
          className={`flex flex-row gap-x-4 items-center px-4 py-2  ${mode=='rest' ? 'bg-slate-700' : 'bg-slate-800'} rounded cursor-pointer`}>
            <img src={Rest} alt="Deskripsi Gambar" className='w-8' />
            <p className='font-semibold text-slate-200'>istirahat</p>
          </div>

          <div
          onClick={()=>setMode('kembali')}
          className={`flex flex-row gap-x-4 items-center px-4 py-2  ${mode=='kembali' ? 'bg-slate-700' : 'bg-slate-800'} rounded cursor-pointer`}>
            <img src={Back} alt="Deskripsi Gambar" className='w-6' />
            <p className='font-semibold text-slate-200'>kembali</p>
          </div>


      </div>
      <div className='grid grid-cols-2  gap-3 mt-4'>
          <div 
            onClick={()=>setMode('izin')}
            className={`flex flex-row gap-x-4 items-center px-4 py-2  ${mode=='izin' ? 'bg-slate-700' : 'bg-slate-800'} rounded cursor-pointer`}>
              <img src={Permit} alt="Deskripsi Gambar" className='w-8' />
              <p className='font-semibold text-slate-200'>Izin Keluar</p>
          </div>

          <div
            onClick={()=>setMode('kembali_izin')}
            className={`flex flex-row gap-x-4 items-center px-4 py-2  ${mode=='kembali_izin' ? 'bg-slate-700' : 'bg-slate-800'} rounded cursor-pointer`}>
              <img src={Back} alt="Deskripsi Gambar" className='w-6' />
              <p className='font-semibold text-slate-200'>kembali dari izin</p>
          </div>
      </div>
        <div className='w-[400px] h-[400px] rounded-3xl flex flex-col items-center justify-center gap-y-4'>
                <input 
                  onContextMenu={(e) => e.preventDefault()}
                  type="password" 
                  value={inputValue} 
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste} 
                  ref={inputRef} 
                  autoComplete='off'
                  className='p-2 border-b border-slate-700   focus:outline-none bg-transparent text-slate-400 text-center' />
                <p className='text-slate-500 text-xs'>Templek kan kartu anda di mesin RFID</p>
        </div>
        <div className=' absolute bottom-5 flex flex-row gap-x-1 items-start justify-start'>
            <img onClick={handleLogout} src={Logo} alt="Deskripsi Gambar" className='w-12 transform -rotate-12' />
            <p className='w-[200px] text-slate-500 text-xs'><span className='font-bold'>Hello, </span>Tugas anda adalah bekerja, masalah absen biar saya yang urus</p>
        </div>
        
        {isModalOpen && (
        <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          width: '400px',
          position: 'absolute',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          rowGap:'1rem',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
         
          <h1 className='text-2xl font-bold text-center'>{username}</h1>
          <img src={resultMsg} alt="Deskripsi Gambar" className='w-12' />
          <h2 className='text-xl text-center'>{msgValue}</h2>
        
        </motion.div>
      )}
        
    </div>
  )
}

export default Body